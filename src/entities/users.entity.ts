import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserAssociationEntity } from "./userAssociation.entity";
import { PostsEntity } from "./posts.entity";
import { PostLikeEntity } from "./postLike.entity";
import { PostViewEntity } from "./postView.entity";
import { CommentLikeEntity } from "./commentLike.entity";

@Entity("users")
export class UsersEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "email", comment: "이메일", unique: true })
  email: string;

  @Column("varchar", { name: "nickname", comment: "닉네임", unique: true })
  nickname: string;

  @Column("varchar", { name: "password", comment: "비밀번호" })
  password: string;

  @Column("varchar", { name: "name", comment: "이름" })
  name: string;

  @Column("varchar", {
    name: "phone_number",
    comment: "핸드폰 번호",
    unique: true,
  })
  phoneNumber: string;

  @Column("varchar", {
    name: "refresh_token",
    comment: "access token 만료 시, 검증 token",
    nullable: true,
    default: null,
  })
  refreshToken: string | null;

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

  @OneToMany(
    () => UserAssociationEntity,
    (userAssociationEntity: UserAssociationEntity) =>
      userAssociationEntity.user,
  )
  userAssociations: UserAssociationEntity[];

  @OneToMany(() => PostsEntity, (postsEntity: PostsEntity) => postsEntity.user)
  posts: PostsEntity[];

  @OneToMany(
    () => PostLikeEntity,
    (postLikeEntity: PostLikeEntity) => postLikeEntity.user,
  )
  postLike: PostLikeEntity[];

  @OneToMany(
    () => PostViewEntity,
    (postViewEntity: PostViewEntity) => postViewEntity.user,
  )
  postView: PostViewEntity[];

  @OneToMany(() => PostsEntity, (postsEntity: PostsEntity) => postsEntity.user)
  comments: PostsEntity[];

  @OneToMany(
    () => CommentLikeEntity,
    (commentLikeEntity: CommentLikeEntity) => commentLikeEntity.user,
  )
  commentLike: CommentLikeEntity[];
}
