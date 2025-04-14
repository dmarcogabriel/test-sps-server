import { Response, NextFunction } from "express";

import { authorize } from "@app/core/auth/auth.service";
import { IRequest } from "@app/core/auth/auth.types";

export const authenticate =  async (req: IRequest, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    res.status(404).json({ message: "Acesso negado." });
    return;
  }

  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    const decoded = await authorize(token);
    req.userId = decoded.id;
    next();
  } catch (e) {
    res.status(404).json({
      message: "Token inválido ou expirado."
    });
  }
}
