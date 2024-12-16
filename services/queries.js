import UserModel from "@/models/Users";
import { replaceMongoIdInObject } from "@/utils/mongoData-utils";

export const createUser = async (user) => {
  return await UserModel.create(user);
};

export const findUserByCredentials = async (credentials) => {
  const user = await UserModel.findOne(credentials).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
};
