import { authService } from "@app/core/auth/auth.factory";
import { Request, Response, NextFunction } from "express";

export const signIn = async ({ body }: Request, res: Response, next: NextFunction) => {
  try {
    const token = await authService.authenticate(body);

    res.status(200).json({
      message: "Sessão iniciada com sucesso.",
      data: { token }
    });
  } catch (e) {
    next(e);
  }
};
