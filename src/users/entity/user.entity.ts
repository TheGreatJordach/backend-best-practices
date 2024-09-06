import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RegistryDate } from "../embedded/registry-date";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  phoneNumber: string;

  @Column(() => RegistryDate, { prefix: false })
  registry: RegistryDate;

  @AfterInsert()
  logInsert() {
    console.log(
      `user ${this.firstName} has been successfully inserted with ID : ${this.id}`
    );
  }

  @AfterUpdate()
  logUpdate() {
    console.log(
      `user ${this.firstName} with ID : ${this.id} has been successfully updated `
    );
  }

  @AfterRemove()
  logRemove() {
    console.log(`user with ID : ${this.id} has been successfully removed `);
  }
}
