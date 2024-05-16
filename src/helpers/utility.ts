import bcrypt from "bcrypt";
import * as jwt from  "jsonwebtoken";
import config from "../constant/config";
import { IUser } from "../interface/user.interface";
import { JwtPayload } from "jsonwebtoken";

export const hashPassword = (plainText: string) => {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(plainText, salt);
  return hash;
};

export const comparePassword = (password: string, encrypted: string) => {
  return bcrypt.compareSync(password, encrypted);
};

export const generateRefreshToken = (payload: Record<string, unknown>): string => {
    return jwt.sign(payload, config.SECRET_KEY_REFRESH, { expiresIn: "7d" });
};

export const verifyRefreshToken = (refreshToken: string): JwtPayload => {
  return jwt.verify(refreshToken, config.SECRET_KEY_REFRESH) as JwtPayload;
};
