import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sports")
export class SportsEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "sport", comment: "종목명" })
  sport: string;
}
