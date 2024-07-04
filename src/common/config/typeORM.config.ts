import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

export const typeORMConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: "mysql",
    host: configService.get("DB_HOST"),
    port: +configService.get("DB_PORT"),
    username: configService.get("DB_USERNAME"),
    password: configService.get("DB_PASSWORD"),
    database: configService.get("DB_DATABASE"),
    entities: [__dirname + "/../../entities/*.entity.{js,ts}"],
    synchronize: false,
    logging: true,
    cache: true,
    migrations: [__dirname + "/../../migrations/*.{ts,js}"],
    migrationsRun: false,
  }),
  dataSourceFactory: async (options) => {
    const dataSource = await new DataSource(options).initialize();
    return dataSource;
  },
};
