import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from "@nestjs/common";
import { map, Observable } from "rxjs";
import { ClassConstructor, plainToInstance } from "class-transformer";

//Custom Decorator
export function Serializer<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new UserResponseInterceptor(dto));
}

export class UserResponseInterceptor<T> implements NestInterceptor {
  constructor(private dto: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<T> {
    return handler.handle().pipe(
      map((data) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
        /**
         * @plainToInsace : The methode converter data to UserDto. data behind incoming User Instance
         * @plainToClass : DEPRECIATED METHOD
         * @excludeExtraneousValues: This property read the UserDto and make sure ONLY field with @Expose()
         * decorator are shared. If you do not use this property, nothing will work.
         *
         * **/
      })
    );
  }
}
