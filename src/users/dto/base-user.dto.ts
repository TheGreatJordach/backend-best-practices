import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from "class-validator";
import { ValidationMessages } from "../common/utils/validation-message";
import { Expose } from "class-transformer";

export class BaseUserDto {
  @Expose()
  @IsString(ValidationMessages.isString("First name"))
  @IsNotEmpty(ValidationMessages.isNotEmpty("First name"))
  @Length(2, 25, ValidationMessages.length("First name", 2, 25))
  readonly firstName: string;

  @Expose()
  @IsString(ValidationMessages.isString("Last name"))
  @IsNotEmpty(ValidationMessages.isNotEmpty("Last name"))
  @Length(2, 25, ValidationMessages.length("Last name", 2, 25))
  readonly lastName: string;

  @Expose()
  @IsNotEmpty()
  @IsPhoneNumber("MA", ValidationMessages.isMAPhoneNumber())
  readonly phoneNumber: string;
  @Expose()
  @IsEmail({}, ValidationMessages.isEmail())
  @IsNotEmpty(ValidationMessages.isNotEmpty("Email"))
  readonly email: string;
}
