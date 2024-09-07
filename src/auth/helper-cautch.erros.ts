import { HttpException, HttpStatus } from "@nestjs/common";
import { LoginDto } from "../users/dto/login-In.dto";
import {
  AuthenticationFailedException,
  UserNotFoundException,
} from "../common/errors/shared-exception.errors";

//ErrorHandling decorator
export function ErrorHandling() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        //call the original method
        return await originalMethod.apply(this, args);
      } catch (error) {
        const loginUser = args[0] as LoginDto;
        // pass the error to the helper function
        return helperCaughtError(error, loginUser);
      }
    };
    return descriptor;
  };
}

// Error handler function
export function helperCaughtError(
  error: Error | HttpException,
  user: LoginDto
) {
  switch (error.constructor) {
    case UserNotFoundException:
      // Handle user not found error
      throw new UserNotFoundException(user.email);
    case AuthenticationFailedException:
      // Handle authentication failure (incorrect password)
      throw new AuthenticationFailedException(user.email);
    default:
      // Handle any unexpected errors
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || "Login failed",
          timestamp: new Date().toISOString(),
          path: "/auth/login",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
  }
}
