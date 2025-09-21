import { IUser, IUserResponse } from '../models/interfaces/users';

export interface IUserRepository {
  createUser(user: IUser): Promise<void>;
  getUserById(id: string): Promise<IUserResponse>;
  getAllUserDataById(id: string): Promise<IUser>;
  getUserByEmail(email: string): Promise<boolean>;
  updateUser(id: string, user: IUser): Promise<void>;
}
