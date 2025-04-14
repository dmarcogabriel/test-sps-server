import { AuthService } from "./auth.service";
import UserRepository from "@app/repositories/user.repository";
import FakeDbAdapter from "@app/infra/db/adapters/fakeDb.adapter";
import { IUser, User } from "../users/user.entity";

const dbAdapter = new FakeDbAdapter<User, IUser>("users");
const userRepository = new UserRepository(dbAdapter);
export const authService = new AuthService(userRepository);
