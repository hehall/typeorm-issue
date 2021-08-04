import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { GenericStage } from "./GenericStage";
import { ProcessTemplate } from "./ProcessTemplate";

@Entity()
export class ProcessTemplateStage {
  @PrimaryGeneratedColumn({
    type: "integer",
  })
  id: number;

  @Column("character varying")
  name: string;

  @Column()
  templateStageSpecificProp: string;

  @ManyToOne((type) => ProcessTemplate)
  @JoinColumn()
  processTemplate: ProcessTemplate;

  @ManyToOne((type) => GenericStage)
  @JoinColumn()
  genericStage: GenericStage;
}
