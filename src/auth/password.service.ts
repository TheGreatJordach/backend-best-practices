import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { CreateUserDto } from "../users/dto/create-user.dto";

import { LoginDto } from "../users/dto/login-In.dto";
import { AuthenticationFailedException } from "../common/errors/shared-exception.errors";

const scryptAsync = promisify(_scrypt);

@Injectable()
export class PasswordService {
  /**
   * Hashes the given password for secure storage.
   *
   * Steps:
   * - Generate a salt
   * - Hash the salt and the password together
   * - Combine the hashed result and the salt
   * - Returns the hashed password
   *
   * @param password - The password to be hashed
   * @returns A promise that resolves to the hashed password
   */
  async hashPassword(password: string): Promise<string> {
    try {
      // Generate a salt
      const salt = randomBytes(16).toString("hex");
      //Hash the generated salt and the password together
      const hash: Buffer = (await scryptAsync(password, salt, 32)) as Buffer;
      //join the hashed result and the sal together
      return `${salt}.${hash.toString("hex")}`;
    } catch (error) {
      // Throwing a more specific exception for production environments
      throw new InternalServerErrorException(
        `Failed to hash password: ${error.message}`
      );
    }
  }

  /**
   * Compares the password provided by a user during login with the hashed password stored in the database.
   *
   * Steps:
   * - Extracts the salt and stored hash from the stored user's password
   * - Hashes the supplied password using the same salt
   * - Compares the hashed password with the stored hash
   *
   * @param loginUser - The login credentials containing the email and password
   * @param storedUser - The user object retrieved from the database
   * @returns A promise that resolves to true if the passwords match, false otherwise
   */
  async comparePassword(
    loginUser: LoginDto,
    storedUser: CreateUserDto
  ): Promise<boolean> {
    try {
      // Extract salt and stored hash from storedUser's password
      const [salt, storedHash] = storedUser.password.split(".");

      // Hash the supplied password using the same salt
      const hashLoginUserPassword = (await scryptAsync(
        loginUser.password,
        salt,
        32
      )) as Buffer;

      // Compare the hashed password with the stored hash
      return hashLoginUserPassword.toString("hex") === storedHash;
    } catch (error) {
      // Handle specific errors if needed
      if (error instanceof TypeError) {
        throw new Error("Invalid password format.");
      } else {
        throw new AuthenticationFailedException(loginUser.email);
      }
    }
  }
}
