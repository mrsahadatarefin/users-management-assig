import { Request, Response } from 'express';
import { userService } from './users.service';
import userSchemaValidate from './users.validate';

import { TUser } from './users.interface';

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
    const result = await userService.getUsersFromDatabase();

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

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const result = await userService.getSingleUserFromDatabase(userId);
    if (!result?.isUserExists(userId)) {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    res.status(200).json({
      success: true,
      message: 'User finds successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData: TUser = req.body;

    const result = await userService.updateUserFromDatabase(userId, userData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userService.deleteUserFromDatabase(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error,
    });
  }
};

const AddOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const orderData: TUser = await req.body;
  const result = await userService.AddOrderInDatabase(userId, orderData);
  res.status(200).json({
    success: true,
    message: 'Order created successfully!',
    data: result,
  });
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  AddOrders,
};
