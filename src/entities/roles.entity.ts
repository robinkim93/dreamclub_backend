import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAssociationEntity } from "./userAssociation.entity";

@Entity("roles")
export class RolesEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "role", comment: "역할명" })
  role: string;

  @OneToMany(
    () => UserAssociationEntity,
    (userAssociationEntity) => userAssociationEntity.role,
  )
  userAssociation: UserAssociationEntity[];
}
