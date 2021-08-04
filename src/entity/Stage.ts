import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { StageType } from "./StageType";
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
  process: Process;

  @ManyToOne((type) => StageType)
  @JoinColumn()
  stageType: StageType;
}
