import { Injectable } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class PasswordService {
  /**********************************************************
   * HASHING THE PASSWORD (process)
   * @Step1 : Generate a salt
   * @Step2 : Hash the salt and the password together
   * @Step3 : join the hashed result and the sal together
   * @Step4 : create a new user and save it
   * @Step5 : return the user
   *********************************************************
   * **/
  async hashPassword(password: string): Promise<string> {
    //@Step1: Generate a salt
    const salt = randomBytes(16).toString("hex");

    //@Step2 : Hash the salt and the password together
    const hash: Buffer = (await scrypt(password, salt, 32)) as Buffer;

    //@Step3 : join the hashed result and the sal together
    return `${salt}.${hash.toString("hex")}`;
  }
}
