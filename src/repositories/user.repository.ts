import { IUser, User } from "@app/core/users/user.entity";
import { ID, IDatabaseAdapter } from "@app/shared/interfaces/IDatabaseAdapter";

export default class UserRepository {
  constructor(private readonly adapter: IDatabaseAdapter<User, IUser>) {}

  public async save(userData: User) {
    const user = await this.adapter.save(userData);

    return new User(user);
  }

  public async findAll() {
    const users = await this.adapter.findAll();

    return users.map(user => new User(user));
  }

  public async findById(userId: ID) {
    const user = await this.adapter.findById(userId);

    return new User(user);
  }

  public async findByEmail(email: string) {
    const user = (await this.adapter.findBy({ email })).first();

    if (!user) return null;

    return new User(user);
  }

  public async updateById(userId: ID, updateData: Partial<IUser>) {
    const updatedUser = await this.adapter.updateById(userId, updateData);

    return new User(updatedUser);
  }

  public async deleteById(userId: ID) {
    const deletedUser = await this.adapter.deleteById(userId);

    return new User(deletedUser);
  }
}