import { BaseUserDto } from "./base-user.dto";
import { ValidationMessages } from "../common/utils/validation-message";
import { IsStrongPassword } from "class-validator";

export class CreateUserDto extends BaseUserDto {
  @IsStrongPassword({}, ValidationMessages.isStrongPassword())
  readonly password: string;
}
