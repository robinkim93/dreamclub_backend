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
import { CommentsEntity } from "./comments.entity";

@Entity("comment_like")
export class CommentLikeEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "comment_id", comment: "댓글 번호" })
  commentId: number;

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
    (usersEntity: UsersEntity) => usersEntity.commentLike,
  )
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UsersEntity;

  @ManyToOne(
    () => CommentsEntity,
    (commentsEntity: CommentsEntity) => commentsEntity.commentLike,
  )
  @JoinColumn({ name: "comment_id", referencedColumnName: "id" })
  comment: CommentsEntity;
}
