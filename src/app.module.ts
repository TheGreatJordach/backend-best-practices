import { BadRequestException, Module, ValidationPipe } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { APP_PIPE } from "@nestjs/core";
import { ValidationError } from "class-validator";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        exceptionFactory: (errors: ValidationError[]) => {
          const formattedErrors = errors.map((error) => ({
            field: error.property,
            issues: error.constraints ? Object.values(error.constraints) : [],
          }));
          return new BadRequestException({
            message: "Validation failed",
            errors: formattedErrors,
          });
        },
      }),
    },
  ],
})
export class AppModule {}
