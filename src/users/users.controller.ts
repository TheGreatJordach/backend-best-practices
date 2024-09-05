import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("auth")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  allUsers() {
    return "This Handler returns all the users ";
  }

  @Post()
  newUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.createUser(createUserDto);
  }
}
