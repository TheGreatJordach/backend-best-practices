import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Serializer } from "../users/interceptors/user-response.interceptor";
import { PublicUserDto } from "../users/dto/public-user.dto";
import { LoginDto } from "../users/dto/login-In.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Serializer(PublicUserDto)
  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post()
  authenticate(@Body() loginDto: LoginDto) {
    return this.authService.login();
  }
}
