import { FastifyReply, FastifyRequest } from "fastify";
import { QueryParams } from "../../interface/request.interface";
import { getUsersRepository, addUsersRepository, deleteUsersRepository, changeRoleUserRepository } from "../../repository/user";
import { IUser } from "../../interface/user.interface";
import {
  sendSuccessResponse,
} from "../../helpers/request.helper";
import { hashPassword } from "../../helpers/utility";
import { removeSessions } from "../../repository/auth";

export const getUsers = async (
  request: FastifyRequest<{ Querystring: QueryParams }>,
  reply: FastifyReply
): Promise<void> => {
  const res = await getUsersRepository(request.query);
  sendSuccessResponse(reply, res, 200);
};

export const addUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const body = request.body as IUser;
  body.role = "user";
  body.password = hashPassword(body.password);
  const res = await addUsersRepository(body);
  sendSuccessResponse(reply, res, 200);
};

export const deleteUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const email: string = (request.body as IUser).email;
  const user: any = deleteUsersRepository(email);
  if (user) {
    await removeSessions(user._id)
  }
  sendSuccessResponse(reply, {}, 200);
};

export const changeRoleUser = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const {
    email,
    role,
  } = request.body as IUser;
  const user: any = changeRoleUserRepository(email, role);
  console.log("🚀 ~ user:", user)
  
  sendSuccessResponse(reply, {}, 200);
};
