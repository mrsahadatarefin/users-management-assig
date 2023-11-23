import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoute } from './app/modules/users/users.route';

const app: Application = express();

app.use(cors());
app.use(express.json());

//routes

app.use('/api/users', UserRoute);

app.get('/', (req: Request, res: Response) => {
  res.send(' user management server');
});

export default app;
