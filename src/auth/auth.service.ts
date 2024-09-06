import { BadRequestException, Injectable } from "@nestjs/common";
import { PasswordService } from "./password.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { User } from "../users/entity/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UsersService
  ) {}

  async signup(userRegister: CreateUserDto) {
    const { email, password } = userRegister;

    //Check if email in use
    const storedUser: User = await this.userService.findOneUser(email);
    if (storedUser) {
      throw new BadRequestException("Email already exists");
    }

    //hash password
    const hashedPassword = await this.passwordService.hashPassword(password);

    return await this.userService.createUser({
      ...userRegister,
      password: hashedPassword,
    });
  }

  login() {
    return "logging ";
  }
}
