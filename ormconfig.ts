import { ConnectionOptions } from "typeorm";
import { GenericStage } from "./src/entity/GenericStage";
import { Process } from "./src/entity/Process";
import { ProcessTemplate } from "./src/entity/ProcessTemplate";
import { ProcessTemplateStage } from "./src/entity/ProcessTemplateStage";
import { Stage } from "./src/entity/Stage";

export const entityList = [
  Stage,
  ProcessTemplate,
  ProcessTemplateStage,
  Process,
  GenericStage,
];

const defaultSettings: ConnectionOptions = {
  type: "postgres",
  name: "default",
  extra: {
    ssl: false,
  },
  port: 5436,
  username: "postgres",
  password: "password",
  database: "posttest",
  synchronize: true,
  logging: false,
  entities: entityList,
  subscribers: ["src/subscriber/*.js"],
  migrations: ["src/migration/*.js"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

export { defaultSettings };
