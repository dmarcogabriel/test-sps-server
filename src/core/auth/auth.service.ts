import jwt from 'jsonwebtoken';

import { APIError } from "../errors";
import { IUser } from "../users/user.entity";
import UserRepository from '@app/repositories/user.repository';
import { authorizeUserValidator } from './auth.validator';

type ISessionData = Pick<IUser, "id" | "type">;

const SECRET_HASH = process.env.SECRET_HASH ?? 'dev';

export const authorize = async (token: string): Promise<ISessionData> => {
  return new Promise(res => {
    jwt.verify(token, SECRET_HASH, undefined, (error, decoded) => {
      if (error) {
        throw new APIError({
          message: "Token inválido ou expirado.",
          type: "INVALID_TOKEN",
          statusNumber: 400
        });
      }

      res(decoded as ISessionData);
    });
  });
}

export class AuthService {
  private readonly SECRET_HASH: string;

  constructor(private readonly userRepository: UserRepository) {
    this.SECRET_HASH = process.env.SECRET_HASH ?? 'dev';
  }

  private generateAccessToken(data: ISessionData) {
    return jwt.sign(data, this.SECRET_HASH);
  }

  async authenticate(body: any) {
    const validated = authorizeUserValidator().validate(body);

    const foundUser = await this.userRepository.findByEmail(validated.email);

    if (!foundUser || !foundUser.validatePassword(validated.password)) {
      throw new APIError({
        message: "Usuário ou Senha incorretos.",
        type: "AUTH_FAILED",
        statusNumber: 400
      });
    }

    const token = this.generateAccessToken({
      id: foundUser.id,
      type: foundUser.type
    });

    return token;
  }
}