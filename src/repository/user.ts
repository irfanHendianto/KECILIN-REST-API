import { QueryParams } from "../interface/request.interface";
import {
  IUser,
  IUserCreateResponse,
  IUserResponse,
} from "../interface/user.interface";
import { UsersDocument, UsersModel } from "../models/user";
import { UpdateWriteOpResult } from "mongoose";

export const getUserByIdRepository = async (id: string): Promise<UsersDocument | null> => {
  const user = await UsersModel.findById(id).exec();
  return user;
}

export const getUsersRepository = async (
  query: QueryParams
): Promise<IUserResponse> => {
  const { page, pageSize, sortBy, sortDirection, q } = query;
  const options = {
    limit: Number(pageSize),
    skip: (Number(page) - 1) * Number(pageSize),
    sort: { sortBy: sortDirection === "asc" ? 1 : -1 },
  };

  const searchQuery = q
    ? {
        $or: [
          { name: { $regex: q, $options: "i" } },
          { email: { $regex: q, $options: "i" } },
        ],
      }
    : {};

  const users = await UsersModel.find(searchQuery, null, options)
    .select("-password")
    .exec();
  const count = await UsersModel.countDocuments().exec();

  return {
    total: count,
    data: users,
  };
};

export const addUsersRepository = async (
  payload: IUser
): Promise<IUserCreateResponse> => {
  const user = await UsersModel.create(payload); // Buat instance user baru dari model
  return {
    name: user.name,
    email: user.email,
    age: user.age,
    role: user.role,
    gender: user.gender,
  };
};

export const deleteUsersRepository = async (
  email: string
): Promise<UsersDocument | null> => {
  const user = await UsersModel.findOneAndDelete({ email }).exec();
  return user;
};
export const changeRoleUserRepository = async (email: string, role: string): Promise<UpdateWriteOpResult> => {
  const user = await UsersModel.updateOne( { email }, {$set : { role: role } }).exec();
  return user;
};
