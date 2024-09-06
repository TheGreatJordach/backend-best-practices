import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entity/user.entity";
import { Serializer } from "./interceptors/user-response.interceptor";
import { PublicUserDto } from "./dto/public-user.dto";

@Serializer(PublicUserDto)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  allUsers() {
    return "This Handler returns all the users ";
  }

  @Post()
  async newUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }
}
