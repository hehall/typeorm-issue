import { Entity, Column, PrimaryColumn, OneToOne, OneToMany } from "typeorm";
import { Stage } from "./Stage";

@Entity()
export class GenericStage {
  @PrimaryColumn("integer")
  id: number;

  @Column("character varying")
  name: number;

  @Column("integer")
  orderId: number;

  @OneToMany((type) => Stage, (stage) => stage.genericStage)
  stages: Stage[];
}
