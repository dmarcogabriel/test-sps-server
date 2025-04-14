import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import routes from '@app/api/http/routes';
import errorHandlerMiddleware from './api/http/middlewares/errorHandler.middleware';

config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
