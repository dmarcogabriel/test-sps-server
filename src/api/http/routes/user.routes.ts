import {Router} from 'express';

import * as userController from '@app/api/http/controllers/user.controller';
import { authenticate } from '@app/api/http/middlewares/auth.middleware';

const routes = Router();

routes.post("/", authenticate, userController.postUser);
routes.get("/", authenticate, userController.getUsers);
routes.get("/me", authenticate, userController.getUserMe);
routes.get("/:userId", authenticate, userController.getUserById);
routes.patch("/:userId", authenticate, userController.updateUserById);
routes.delete("/:userId", authenticate, userController.deleteUserById);

export default routes;
