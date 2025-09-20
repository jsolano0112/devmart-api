import { IUserRepository } from '../contracts/user-repository.contract';
import { IUser } from '../models/interfaces/users';
import { User } from '../models/user.schema';

export class UserRepository implements IUserRepository {
  public async getUserById(id: number) {
    try {
      return await User.findById(id);
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong fetching Users');
    }
  }

  public async getUserByEmail(email: string) {
    try {
      return await User.findOne({ email: email });
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong fetching Users');
    }
  }

  public async createUser(user: IUser) {
    try {
      const newUser = new User(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong creating a new user');
    }
  }
}
