import "reflect-metadata";
import { createConnection } from "typeorm";
import { defaultSettings } from "../ormconfig";
import { Process } from "./entity/Process";
import { ProcessTemplate } from "./entity/ProcessTemplate";
import { ProcessTemplateStage } from "./entity/ProcessTemplateStage";
import { Stage } from "./entity/Stage";

createConnection(defaultSettings)
  .then(async (connection) => {
    const prts = new ProcessTemplateStage();
    prts.name = "some prt stage";
    prts.templateStageSpecificProp = "some value here";
    await connection.manager.save(prts);

    const prts2 = new ProcessTemplateStage();
    prts2.name = "some prt stage 2";
    prts2.templateStageSpecificProp = "text";
    await connection.manager.save(prts2);

    const prts3 = new ProcessTemplateStage();
    prts3.name = "some prt stage 3";
    prts3.templateStageSpecificProp = "text";
    await connection.manager.save(prts3);

    const prt = new ProcessTemplate();
    prt.name = "some template";
    prt.stages = [prts, prts2, prts3];
    await connection.manager.save(prt);

    const stage = new Stage();
    stage.name = "some normal stage";
    stage.stageSpecificProp = "test value";
    await connection.manager.save(stage);

    const stage2 = new Stage();
    stage2.name = "some normal stage2";
    stage2.stageSpecificProp = "test";
    await connection.manager.save(stage2);

    const pr = new Process();
    pr.name = "some normal template";
    pr.stages = [stage, stage2];
    await connection.manager.save(pr);

    const processRevisionTemplates = await connection.manager
      .getRepository(ProcessTemplate)
      .find({
        order: { id: "ASC" },
        relations: ["stages", "stages.genericStage"],
      });

    console.log(processRevisionTemplates[0].stages);

    const processRevisions = await connection.manager
      .getRepository(Process)
      .find({
        order: { id: "ASC" },
        relations: ["stages", "stages.genericStage"],
      });

    console.log(processRevisions[0].stages);
  })
  .catch((error) => console.log(error));
