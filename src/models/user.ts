import {model, Model, Schema, Document, Types} from 'mongoose';

export interface User {
  id?: string;
  email: string;
  password: string;
}

const schema = new Schema(
    {
      // eslint-disable-next-line new-cap
      id: {type: String, default: Types.ObjectId()},
      email: {type: String, required: true, unique: true},
      password: {type: String, required: true},
    },
    {
      toJSON: {
        transform: (_, ret): void => {
          ret.id = ret._id;
          delete ret.__v;
          delete ret._id;
        },
      },
    },
);

interface UserModel extends Omit<User, 'id'>, Document {}

export const User: Model<UserModel> = model('User', schema);
