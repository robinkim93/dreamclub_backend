import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UsersEntity } from "./users.entity";
import { RolesEntity } from "./roles.entity";
import { TeamsEntity } from "./teams.entity";

@Entity("user_association")
export class UserAssociationEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", comment: "유저 번호" })
  userId: number;

  @Column("int", {
    name: "team_id",
    comment: "팀 번호",
    default: null,
    nullable: true,
  })
  teamId?: number | null;

  @Column("int", { name: "role_id", comment: "역할 번호" })
  roleId: number;

  @Column("tinyint", {
    name: "is_confirm",
    comment: "승인 여부 (0: 미승인, 1: 승인)",
    default: 0,
  })
  isConfirm: number;

  @Column("boolean")
  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
    comment: "생성일자",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    name: "updated_at",
    comment: "수정일자",
    nullable: true,
    default: null,
  })
  updatedAt?: Date | null;

  @DeleteDateColumn({
    type: "timestamp",
    name: "deleted_at",
    comment: "삭제일자",
    nullable: true,
    default: null,
  })
  deletedAt?: Date | null;

  @ManyToOne(
    () => UsersEntity,
    (usersEntity: UsersEntity) => usersEntity.userAssociations,
  )
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UsersEntity;

  @ManyToOne(
    () => TeamsEntity,
    (teamsEntity: TeamsEntity) => teamsEntity.userAssociation,
  )
  @JoinColumn({ name: "team_id", referencedColumnName: "id" })
  team: TeamsEntity;

  @ManyToOne(
    () => RolesEntity,
    (rolesEntity: RolesEntity) => rolesEntity.userAssociation,
  )
  @JoinColumn({ name: "role_id", referencedColumnName: "id" })
  role: RolesEntity;
}
