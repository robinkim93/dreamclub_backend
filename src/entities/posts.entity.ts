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
import { PostLikeEntity } from "./postLike.entity";
import { PostViewEntity } from "./postView.entity";
import { TeamsEntity } from "./teams.entity";

@Entity("posts")
export class PostsEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", comment: "제목" })
  title: string;

  @Column("varchar", { name: "content", comment: "내용" })
  content: string;

  @Column("varchar", {
    name: "file_url",
    comment: "첨부 파일 url",
    default: null,
    nullable: true,
  })
  fileUrl?: string | null;

  @Column("int", { name: "user_id", comment: "유저 번호" })
  userId: number;

  @Column("tinyint", { name: "is_notice", comment: "공지글 여부", default: 0 })
  isNotice: number;

  @Column("tinyint", { name: "is_secret", comment: "비밀글 여부", default: 0 })
  isSecret: number;

  @Column("varchar", {
    name: "password",
    comment: "비밀번호",
    default: null,
    nullable: true,
  })
  password?: string;

  @Column("int", {
    name: "team_id",
    comment: "팀 번호",
    default: null,
    nullable: true,
  })
  teamId: number;

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

  @ManyToOne(() => TeamsEntity, (teamsEntity: TeamsEntity) => teamsEntity.posts)
  @JoinColumn({ name: "team_id", referencedColumnName: "id" })
  teams: TeamsEntity;

  @OneToMany(
    () => PostLikeEntity,
    (postLikeEntity: PostLikeEntity) => postLikeEntity.post,
  )
  postLike: PostLikeEntity[];

  @OneToMany(
    () => PostViewEntity,
    (postViewEntity: PostViewEntity) => postViewEntity.post,
  )
  postView: PostViewEntity[];
}
