import UserRepository from '@app/repositories/user.repository';
import { createUserValidator, updateUserValidator } from './user.validator'
import { APIError } from '../errors';
import { User } from './user.entity';
import { ID } from '@app/shared/interfaces/IDatabaseAdapter';

export class UserService {
  constructor(
    private userRepository: UserRepository
  ) {}

  async createUser(body: any) {
    const validated = createUserValidator().validate(body);

    const userExists = await this.userRepository.findByEmail(validated.email);
    if (userExists) {
      throw new APIError({
        message: "Usuário já cadastrado.",
        type: "DUPLICATION",
        statusNumber: 400
      });
    }

    return this.userRepository.save(new User(validated));
  }

  async getUsers() {
    return this.userRepository.findAll();
  }

  async getUserById(userId: ID) {
    return this.userRepository.findById(userId);
  }

  async updateUserById(userId: ID, body: any) {
    const validated = updateUserValidator().validate(body);

    return this.userRepository.updateById(userId, validated);
  }

  async deleteUserById(userId: ID) {
    return this.userRepository.deleteById(userId);
  }
}
