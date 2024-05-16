import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';
import { IUserDb } from '../interface/user.interface';

export type UsersDocument = IUserDb & Document;
export const collectionName = 'users';

const UsersSchema = new Schema<UsersDocument>(
  {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
    collection: collectionName,
  }
);

UsersSchema.index({ email: 1 }, { unique: true });

export const UsersModel: Model<UsersDocument> = mongoose.model(
  collectionName,
  UsersSchema
);
