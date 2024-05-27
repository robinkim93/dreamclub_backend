import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const typeormDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["src/entities/*.entity.{js,ts}"],
  synchronize: false,
  logging: true,
  cache: true,
  migrations: ["src/migrations/*.{ts,js}"],
  migrationsRun: true,
});

export default typeormDataSource;
