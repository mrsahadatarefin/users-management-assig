import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TUser, UserMethodModel, UserMethods } from './users.interface';
import config from '../../config';

const userSchema = new Schema<TUser, UserMethodModel, UserMethods>({
  userId: {
    type: Number,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  fullName: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
  },
  address: {
    street: String,
    city: String,
    country: String,
  },
  orders: [
    {
      productName: {
        type: String,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;

  return userObject;
};

//creating a custom static methods
// userSchema.statics.isUserExists = async function (id: number) {
//   const existingUser = await UserMOdel.findOne({ id });
//   return existingUser;
// };

userSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await UserMOdel.findOne({ id });
  return existingUser;
};

// middleware

userSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_saltRounds),
    );
  } catch (e) {
    console.log(e);
  }

  next();
});
userSchema.post('save', function (doc, next) {
  next();
});

const UserMOdel = model<TUser, UserMethodModel>('User', userSchema);

export default UserMOdel;
