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
  // Setting the name of the column for postgres to something else
  // will make it dissapear when the mixup happens
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
