import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configValidationSchema } from "./config-validation.shema";
import { DataSource } from "typeorm";
import { CustomFileLogger } from "./database.logger";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow("DATASOURCE_HOST"),
        port: configService.getOrThrow("DATASOURCE_PORT"),
        username: configService.getOrThrow("DATASOURCE_USERNAME"),
        password: configService.getOrThrow("DATASOURCE_PASSWORD"),
        database: configService.getOrThrow("DATASOURCE_DATABASE"),
        synchronize: false,
        entities: [],
        logger: new CustomFileLogger("DATASOURCE_LOGS"),
      }),
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error("DataSourceOption not provided");
        }
        const dataSource = new DataSource(options);
        await dataSource.initialize();
        return dataSource;
      },
    }),
  ],
})
export class DatabaseModule {}
