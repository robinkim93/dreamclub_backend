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

@Entity("teams")
export class TeamsEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", comment: "팀명" })
  name: string;

  @Column("varchar", {
    name: "logo_url",
    comment: "팀 로고 파일 url",
    default: null,
    nullable: true,
  })
  logoUrl?: string | null;

  @Column("varchar", {
    name: "introduce",
    comment: "한 줄 소개",
    default: null,
    nullable: true,
  })
  introduce?: string | null;

  @Column("timestamp", { name: "since", comment: "창단일" })
  since: Date;

  @Column("int", { name: "user_id", comment: "유저 번호" })
  userId: number;

  @Column("int", { name: "sports_id", comment: "종목 번호" })
  sportsId: number;

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
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: "timestamp",
    name: "deleted_at",
    comment: "삭제일자",
  })
  deletedAt: Date;

  @ManyToOne(() => UsersEntity, (usersEntity: UsersEntity) => usersEntity.posts)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UsersEntity;

  // sports entity
  // @ManyToOne(() => UsersEntity, (usersEntity: UsersEntity) => usersEntity.posts)
  // @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  // sports: UsersEntity;
}
