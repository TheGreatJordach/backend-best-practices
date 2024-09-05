import { IsEmail, IsNotEmpty } from "class-validator";
import { ValidationMessages } from "../common/utils/validation-message";

export class LoginDto {
  @IsEmail({}, ValidationMessages.isEmail())
  @IsNotEmpty(ValidationMessages.isNotEmpty("Email"))
  readonly email: string;

  @IsNotEmpty(ValidationMessages.isNotEmpty("Password"))
  readonly password: string;
}
