import express from 'express';
import { userController } from './users.controller';

const route = express.Router();

route.get('/', userController.getAllUsers);
route.post('/', userController.createUser);
route.get('/:userId', userController.getSingleUser);
route.put('/:userId', userController.updateUser);

export const UserRoute = route;
