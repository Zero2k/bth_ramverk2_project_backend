import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import constants from '../config/constants';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    avatar: String,
    password: String,
    email: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }

  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id,
        username: this.username,
      },
      constants.JWT_SECRET_ONE,
      { expiresIn: '20m' },
    );
  },
};

export default mongoose.model('User', UserSchema);
