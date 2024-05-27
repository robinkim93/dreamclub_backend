import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class RolesEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "role", comment: "역할명" })
  role: string;
}
