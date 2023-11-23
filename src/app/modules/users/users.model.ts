import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TUser } from './users.interface';
import config from '../../config';

const userSchema = new Schema<TUser>({
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
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
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
      id: {
        type: Schema.Types.ObjectId,
        ref: 'Orders',
      },
    },
  ],
});

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

const UserMOdel = model<TUser>('User', userSchema);

export default UserMOdel;
