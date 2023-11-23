import { TUser } from './users.interface';
import UserMOdel from './users.model';

const createUserInDatabase = async (user: TUser) => {
  const result = await new UserMOdel(user).save();
  return result;
};
const getUsersIntoDatabase = async () => {
  const result = await UserMOdel.find({});
  return result;
};

export const userService = {
  createUserInDatabase,
  getUsersIntoDatabase,
};
