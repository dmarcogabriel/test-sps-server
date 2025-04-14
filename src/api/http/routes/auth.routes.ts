import {Router} from 'express';

import { signIn } from '@app/api/http/controllers/auth.controller';

const routes = Router();

routes.post("/sign-in", signIn);

export default routes;
