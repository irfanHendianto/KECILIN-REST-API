import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';
import { ITokenDb } from '../interface/token.interface';

export type TokenDocument = ITokenDb & Document;
export const collectionName = 'token';

const TokenSchema = new Schema<TokenDocument>(
  {
    user_id: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    token: {
        type: String,
        required: true,
    },
    refresh_token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
  },
  {
    collection: collectionName,
  }
);

TokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });

export const TokenModel: Model<TokenDocument> = mongoose.model(
  collectionName,
  TokenSchema
);
