import { ObjectId } from "mongoose";

export interface IToken {
    user_id: ObjectId
    token: string;
    refresh_token: string;
}

export interface ITokenDb extends IToken{
    _id: number;
    createdAt: Date;
}