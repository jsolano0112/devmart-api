import { IUser } from '../models/interfaces/users';

export interface IUserRepository {
  createUser(user: IUser);
  getUserById(id: number);
}
