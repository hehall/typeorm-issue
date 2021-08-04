import "reflect-metadata";
import { createConnection } from "typeorm";
import { defaultSettings } from "../ormconfig";
import { Process } from "./entity/Process";
import { ProcessTemplate } from "./entity/ProcessTemplate";
import { ProcessTemplateStage } from "./entity/ProcessTemplateStage";
import { Stage } from "./entity/Stage";

createConnection(defaultSettings)
  .then(async (connection) => {
    // Setting up objects
    const pts = new ProcessTemplateStage();
    pts.name = "some prt stage";
    pts.templateStageSpecificProp = "some value here";
    await connection.manager.save(pts);

    const pts2 = new ProcessTemplateStage();
    pts2.name = "some prt stage 2";
    pts2.templateStageSpecificProp = "text";
    await connection.manager.save(pts2);

    const pts3 = new ProcessTemplateStage();
    pts3.name = "some prt stage 3";
    pts3.templateStageSpecificProp = "text";
    await connection.manager.save(pts3);

    const pt = new ProcessTemplate();
    pt.name = "some template";
    pt.stages = [pts, pts2, pts3];
    await connection.manager.save(pt);

    const stage = new Stage();
    stage.name = "some normal stage";
    stage.stageSpecificProp = "test value";
    await connection.manager.save(stage);

    const stage2 = new Stage();
    stage2.name = "some normal stage2";
    stage2.stageSpecificProp = "test";
    await connection.manager.save(stage2);

    const process = new Process();
    process.name = "some normal template";
    process.stages = [stage, stage2];
    await connection.manager.save(process);

    // Get process templates,
    // joining (process template) stages and stages.genricStage
    const processTemplates = await connection.manager
      .getRepository(ProcessTemplate)
      .find({
        relations: ["stages", "stages.stageType"],
      });

    console.log("problem here", processTemplates[0].stages);

    // Get processes template stages and its genricStage
    const processTemplateStages = await connection.manager
      .getRepository(ProcessTemplateStage)
      .find({
        relations: ["stageType"],
      });

    console.log("this is fine", processTemplateStages);

    // Get processes, joining stages and stages.genricStage
    const processes = await connection.manager.getRepository(Process).find({
      relations: ["stages", "stages.stageType"],
    });

    console.log("this is also fine", processes[0].stages);
  })
  .catch((error) => console.log(error));
