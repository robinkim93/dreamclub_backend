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
import { PostsEntity } from "./posts.entity";

@Entity("post_like")
export class PostLikeEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "post_id", comment: "글 번호" })
  postId: number;

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
    (usersEntity: UsersEntity) => usersEntity.postLike,
  )
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UsersEntity;

  @ManyToOne(
    () => PostsEntity,
    (postsEntity: PostsEntity) => postsEntity.postLike,
  )
  @JoinColumn({ name: "post_id", referencedColumnName: "id" })
  post: PostsEntity;
}
