import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UsersEntity } from "./users.entity";
import { CommentLikeEntity } from "./commentLike.entity";

@Entity("comments")
export class CommentsEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "content", comment: "내용" })
  content: string;

  @Column("int", { name: "user_id", comment: "유저 번호" })
  userId: number;

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

  @ManyToOne(
    () => UsersEntity,
    (usersEntity: UsersEntity) => usersEntity.comments,
  )
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UsersEntity;

  @OneToMany(
    () => CommentLikeEntity,
    (commentLikeEntity) => commentLikeEntity.comment,
  )
  commentLike: CommentLikeEntity[];
}
