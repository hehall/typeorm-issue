import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { GenericStage } from "./GenericStage";
import { Process } from "./Process";

@Entity()
export class Stage {
  @PrimaryGeneratedColumn({ type: "integer", name: "stage_id" })
  id: number;

  @Column("character varying")
  name: string;

  @Column()
  stageSpecificProp: string;

  @ManyToOne((type) => Process)
  @JoinColumn()
  processRevision: Process;

  @ManyToOne((type) => GenericStage)
  @JoinColumn()
  genericStage: GenericStage;
}
