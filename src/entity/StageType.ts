import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Stage } from "./Stage";

@Entity()
export class StageType {
  @PrimaryColumn("integer")
  id: number;

  @Column("character varying")
  name: number;

  @OneToMany((type) => Stage, (stage) => stage.stageType)
  stages: Stage[];
}
