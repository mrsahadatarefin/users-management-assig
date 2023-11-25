import { Model } from 'mongoose';
export type FullName = {
  firstName: string;
  lastName: string;
};
export type Address = {
  street: string;
  city: string;
  country: string;
};
export type Orders = {
  street: string;
  city: string;
  country: string;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Address;
  orders?: Orders[];
};

// export type UserMethods = {
//   isUserExists(id: string): Promise<TUser | null>;
// };

export interface UserMethodModel extends Model<TUser> {
  isUserExists(id: number): Promise<TUser | null>;
}
