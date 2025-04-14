import { Request, Response, NextFunction } from "express";

import { userService } from "@app/core/users/user.factory";
import { IRequest } from "@app/core/auth/auth.types";

export const postUser = async ({ body }: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(body);

    res.status(200).json({
      message: "Usuário criado com sucesso.",
      data: user.toJson()
    });
  } catch (e) {
    next(e);
  }
};

export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers();

    res.status(200).json({
      messsage: "Usuários encontrados com sucesso.",
      data: users.map(user => user.toJson())
    });
  } catch (e) {
    next(e);
  }
};

export const getUserById = async ({ params }: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUserById(params?.userId!);

    res.status(200).json({
      message: "Usuário encontrado com sucesso.",
      data: user.toJson()
    });
  } catch (e) {
    next(e);
  }
};

export const getUserMe = async ({ userId }: IRequest, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUserById(userId!);

    res.status(200).json({
      message: "Usuário encontrado com sucesso.",
      data: user.toJson()
    });
  } catch (e) {
    next(e);
  }
};

export const updateUserById = async ({ params, body }: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await userService.updateUserById(params?.userId!, body);

    res.status(200).json({
      message: "Usuário atualizado com sucesso.",
      data: updatedUser.toJson()
    });
  } catch (e) {
    next(e);
  }
};

export const deleteUserById = async ({ params }: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await userService.deleteUserById(params?.userId!);

    res.status(200).json({
      message: "Usuário deletado com sucesso.",
      data: updatedUser.toJson()
    });
  } catch (e) {
    next(e);
  }
};
