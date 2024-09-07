import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";

// Email Already Exists Exception
export class EmailAlreadyExistException extends BadRequestException {
  constructor() {
    super("Email already exists.");
  }
}

// User Not Found Exception
export class UserNotFoundException extends HttpException {
  constructor(identifier: string | number) {
    const message =
      typeof identifier === "string"
        ? `User with email ${identifier} not found.`
        : `User with ID ${identifier} not found.`;

    super(message, HttpStatus.NOT_FOUND);
  }
}

// Authentication Failed Exception
export class AuthenticationFailedException extends HttpException {
  constructor(email: string) {
    const message = `Login failed for user with email ${email}. Incorrect password or email.`;
    super(message, HttpStatus.FORBIDDEN);
  }
}
