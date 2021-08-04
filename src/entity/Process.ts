import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Stage } from "./Stage";

@Entity()
export class Process {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @Column("character varying")
  name?: string;

  @OneToMany((type) => Stage, (stage) => stage.process)
  stages?: Stage[];
}
