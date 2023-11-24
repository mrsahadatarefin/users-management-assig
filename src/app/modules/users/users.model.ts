import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TUser, UserMethods, UserMethodModel } from './users.interface';
import config from '../../config';

const userSchema = new Schema<TUser, UserMethodModel, UserMethods>({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
