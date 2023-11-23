import { Request, Response } from 'express';
import { userService } from './users.service';
import userSchemaValidate from './users.validate';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const userData = userSchemaValidate.parse(user);

    const result = await userService.createUserInDatabase(userData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User do not create successfully!',
      error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsersIntoDatabase();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User do not create successfully!',
      error,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
};
