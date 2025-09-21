import { statusCode404 } from '../../../shared/interfaces/general-response';
import { IUserRepository } from '../contracts/user-repository.contract';
import { IUser, IUserResponse } from '../models/interfaces/users';
import { User } from '../models/user.schema';

export class UserRepository implements IUserRepository {
  public async getUserById(id: string): Promise<IUserResponse> {
    try {
      const user = await User.findById(id);
      if (!user) throw statusCode404;
      const {
        firstName,
        lastName,
        email,
        zipCode,
        mobilePhone,
        address,
        city,
      } = user;
      return {
        id,
        firstName,
        lastName,
        email,
        zipCode,
        mobilePhone,
        address,
        city,
      };
    } catch (error) {
      throw error;
    }
  }

  public async getAllUserDataById(id: string): Promise<IUser> {
    try {
      const user = await User.findById(id);
      if (!user) throw statusCode404;
      const {
        firstName,
        lastName,
        email,
        zipCode,
        mobilePhone,
        address,
        city,
        password,
        isActive,
        isAdmin,
      } = user;
      return {
        firstName,
        lastName,
        email,
        zipCode,
        mobilePhone,
        address,
        city,
        password,
        isActive,
        isAdmin,
      };
    } catch (error) {
      throw error;
    }
  }

  public async getUserByEmail(email: string): Promise<boolean> {
    try {
      const user = await User.findOne({ email: email });
      if (!user) throw statusCode404;
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async createUser(user: IUser): Promise<void> {
    try {
      const newUser = new User(user);
      await newUser.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async updateUser(id: string, user: IUser): Promise<void> {
    try {
      await User.findByIdAndUpdate(id, { $set: user }, { new: true });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
