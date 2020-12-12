import mongoose, { Schema, Document, Types } from 'mongoose';

export interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  token: string | null;
  updatedAt: Date | null;
  createdAt: Date;
}

export interface UserDocument extends Document, User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  token: string | null;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
