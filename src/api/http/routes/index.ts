import { Router } from 'express';

import { default as userRoutes } from './user.routes';
import { default as authRoutes } from './auth.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);

export default routes;
