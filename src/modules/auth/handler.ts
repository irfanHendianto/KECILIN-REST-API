import { FastifyReply, FastifyRequest } from "fastify";

import {
  getUserByEmail,
  checkEmailAndPassword,
  createSession,
  removeSessions,
  getSessionByRefreshToken,
} from "../../repository/auth";
import {
  sendSuccessResponse,
} from "../../helpers/request.helper";
import { IAuth } from "../../interface/auth.interface";
import { IUser } from "../../interface/user.interface";
import { generateRefreshToken, verifyRefreshToken } from "../../helpers/utility";
import { AppError } from "../../helpers/onError";
import { getUserByIdRepository } from "../../repository/user";


export const login = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const body = request.body as IAuth;
  const user: IUser | null = await getUserByEmail(body.email);
  if (!user) {
    throw new AppError("Invalid email or password", 400);
    return;
  }
  const isValid = await checkEmailAndPassword(
    body.password,
    user.password as string
  );
  if (!isValid) {
    throw new AppError("Invalid email or password", 400);
    return;
  }
  const token = request.server.jwt.sign(
    {
      email: user.email,
      role: user.role,
      id: user._id,
    },
    { expiresIn: "1h" }
  );

  const refresh_token = generateRefreshToken({
    email: user.email,
    role: user.role,
    id: user._id,
  });
  await createSession(user._id, token, refresh_token);
  const res = {
    token,
    refresh_token,
  };
  sendSuccessResponse(reply, res, 200);
};

export const logout = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const user = request.user as IUser;
  const res = await removeSessions(user._id);
  sendSuccessResponse(reply, {}, 200);
};

export const genereateNewToken = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const user = request.user as IUser;
  const body = request.body as { refresh_token: string };
  const res = verifyRefreshToken(body.refresh_token);
  if (user.id !== res.id) {
    throw new AppError("Token and Refresh Token Doesn't Match", 400);
  }
  const checkUserStillexist = await getUserByIdRepository(user.id);
  if (!checkUserStillexist) {
    throw new AppError("User Not Found", 404);
  }
  const session = getSessionByRefreshToken(user.id, body.refresh_token);

  if (!session) {
    throw new AppError("Invalid Refresh Token", 404);
  }

  const newToken = request.server.jwt.sign(
    {
      email: checkUserStillexist.email,
      role: checkUserStillexist.role,
      id: checkUserStillexist._id,
    },
    { expiresIn: "1h" }
  );
  const result = {
    token: newToken
  }
  sendSuccessResponse(reply, result, 200);
};


