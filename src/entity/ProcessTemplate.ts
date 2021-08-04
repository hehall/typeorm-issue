import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProcessTemplateStage } from "./ProcessTemplateStage";

@Entity()
export class ProcessTemplate {
  @PrimaryGeneratedColumn({
    type: "integer",
  })
  id: number;

  @Column("character varying")
  name?: string;

  @OneToMany((type) => ProcessTemplateStage, (stage) => stage.processTemplate)
  stages?: ProcessTemplateStage[];
}
