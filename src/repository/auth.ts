import { comparePassword } from "../helpers/utility";
import { UsersModel } from "../models/user";
import { TokenModel } from "../models/sessions";
import { ObjectId } from "mongoose";

export const getUserByEmail = (email: string) => {
  return UsersModel.findOne({ email: email });
};

export const checkEmailAndPassword = async (
  password: string,
  Encryptedpassword: string
): Promise<boolean> => {
  const isValid = comparePassword(password, Encryptedpassword);
  if (!isValid) {
    return false;
  }
  return true;
};

export const createSession = async (userId: ObjectId,token: string, refreshToken: string) => {
    await TokenModel.create({ user_id: userId ,token, refresh_token: refreshToken });
    return;
};

export const removeSessions = async (userId: ObjectId) => {
  await TokenModel.deleteMany({ user_id: userId });
  return;
};

export const getSession = async (userId: ObjectId, token: string) => {
  return TokenModel.findOne({ user_id: userId, token });
}

export const getSessionByRefreshToken = async (userId: ObjectId, token: string) => {
  return TokenModel.findOne({ user_id: userId, refresh_token: token });
}

export const updateSession = async (userId: ObjectId, token: string, refreshToken: string) => {
  await TokenModel.updateOne({ user_id: userId, refresh_token: refreshToken }, { $set: { token } });
  return;
}
    