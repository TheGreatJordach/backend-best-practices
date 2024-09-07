import { Injectable } from "@nestjs/common";
import { PasswordService } from "./password.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { User } from "../users/entity/user.entity";
import {
  AuthenticationFailedException,
  EmailAlreadyExistException,
  UserNotFoundException,
} from "../common/errors/shared-exception.errors";
import { LoginDto } from "../users/dto/login-In.dto";
import { ErrorHandling } from "./helper-cautch.erros";

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UsersService
  ) {}

  async signup(userRegister: CreateUserDto): Promise<User> {
    const { email, password } = userRegister;

    //Check if email in use
    const storedUser: User = await this.userService.findOneUser(email);
    if (storedUser) {
      throw new EmailAlreadyExistException();
    }

    //hash password
    const hashedPassword = await this.passwordService.hashPassword(password);

    return await this.userService.createUser({
      ...userRegister,
      password: hashedPassword,
    });
  }

  @ErrorHandling()
  async login(logInUser: LoginDto) {
    // Check if the email provided by the user is present in the database
    const storedUser = await this.userService.findOneUser(logInUser.email);

    if (!storedUser) {
      // If no user is found, throw a custom exception
      throw new UserNotFoundException(logInUser.email);
    }

    // User the Password service to compare the Password : Return Boolean
    const isPasswordSame: boolean = await this.passwordService.comparePassword(
      logInUser,
      storedUser
    );

    if (!isPasswordSame) {
      // If the password doesn't match, throw a custom exception
      throw new AuthenticationFailedException(logInUser.email);
    }

    return storedUser;
  }
}
