import express from 'express';
import { userController } from './users.controller';

const route = express.Router();

route.post('/', userController.createUser);
route.get('/', userController.getAllUsers);

export const UserRoute = route;
