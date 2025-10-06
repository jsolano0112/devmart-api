import { Exception } from '../../../shared/helpers/exception-message';
import { IUser, IUserResponse } from '../../../shared/interfaces/users';
import { User } from '../models/user.schema';

export class UserRepository {
  public async getUserById(id: string): Promise<IUserResponse> {
    try {
      const user = await User.findById(id);
      if (!user) throw new Exception('User not found.', 404);
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
      if (!user) throw new Exception('User not found.', 404);
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
      console.log(error)
      throw error;
    }
  }

  public async getUserByEmail(email: string) {
    try {
      const user = await User.findOne({ email: email });
      return user;
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
