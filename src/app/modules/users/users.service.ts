import { TUser } from './users.interface';
import UserMOdel from './users.model';

const createUserInDatabase = async (user: TUser) => {
  const result = await new UserMOdel(user).save();

  return result;
};
const getUsersFromDatabase = async () => {
  const result = await UserMOdel.aggregate([
    { $match: {} },
    {
      $project: {
        _id: 0,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

const getSingleUserFromDatabase = async (userId: string) => {
  const result = await UserMOdel.findOne({ userId }, { password: 0, _id: 0 });
  return result;
};

const updateUserFromDatabase = async (userId: string, userData: TUser) => {
  const result = await UserMOdel.updateOne({ userId }, { $set: userData });
  return result;
};
const deleteUserFromDatabase = async (userId: string) => {
  const result = await UserMOdel.deleteOne({ userId });

  return result;
};

const AddOrderInDatabase = async (userId: string, orderData: TUser) => {
  const result = await UserMOdel.updateOne(
    { userId },
    { $push: { orders: orderData } },
  );

  return result;
};

export const userService = {
  createUserInDatabase,
  getUsersFromDatabase,
  getSingleUserFromDatabase,
  updateUserFromDatabase,
  deleteUserFromDatabase,
  AddOrderInDatabase,
};
