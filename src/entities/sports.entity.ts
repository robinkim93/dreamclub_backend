import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TeamsEntity } from "./teams.entity";

@Entity("sports")
export class SportsEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "sport", comment: "종목명" })
  sport: string;

  @OneToMany(() => TeamsEntity, (teamsEntity) => teamsEntity.sports)
  teams: TeamsEntity[];
}
