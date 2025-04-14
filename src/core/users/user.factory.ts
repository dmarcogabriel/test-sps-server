import { UserService } from "@app/core/users/user.service";
import UserRepository from "@app/repositories/user.repository";
import FakeDbAdapter from "@app/infra/db/adapters/fakeDb.adapter";
import { IUser, User } from "./user.entity";

const dbAdapter = new FakeDbAdapter<User, IUser>("users");
const repository = new UserRepository(dbAdapter);
export const userService = new UserService(repository);
