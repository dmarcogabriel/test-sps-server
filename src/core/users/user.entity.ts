type IUserType = 'admin' | 'user'
export type IUser = {
  id?: number
  name: string
  email: string
  type: IUserType
  password: string
}

export class User {
  public id?: number
  public name: string
  public email: string
  public type: IUserType
  private password: string

  constructor(user: IUser) {
    this.id = user.id ?? undefined
    this.name = user.name
    this.email = user.email
    this.type = user.type
    this.password = user.password
  }

  public toJson(): Omit<IUser, "password"> {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      type: this.type
    }
  }

  public validatePassword(password: string): boolean {
    // * Fake password validation
    return this.password === password;
  }
}