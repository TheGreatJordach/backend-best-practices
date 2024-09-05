import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entity/user.entity";

@Injectable()
export class UsersService {
  createUser(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return "this Service create new user";
  }
}
