import mongoose from 'mongoose';
import { UserType } from '../interfaces/UserType';

import bcrypt from 'bcryptjs';
const saltRounds = 10;


export interface IUser extends mongoose.Document {
    name: string,
    email: string,
    userType: UserType,
    password: string,

}
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    userType: {
      type: String,
      index: false,
      enum: Object.values(UserType) ,
      required: true
    },
    password: {
      type: String,
      index: false,
      required: true
    }
  },
  {
    timestamps: true,
  }
);


userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
  } else {
    next();
  }
});

const User = mongoose.model<IUser>('user', userSchema);
export { User };