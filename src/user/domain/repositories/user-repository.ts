import { Exception } from '../../../shared/helpers/exception-message';
import { IUser } from '../../../shared/interfaces/users';
import { User } from '../models/user.schema';

export class UserRepository {
  public async getUserById(id: number) {
    try {
      return await User.findById(id);
    } catch (error) {
      throw error;
    }
  }

  public async getAllUserDataById(id: number): Promise<IUser> {
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
        lockUntil,
        failedLoginAttempts,
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
        password,
        isActive,
        isAdmin,
        lockUntil,
        failedLoginAttempts,
      };
    } catch (error) {
      console.log(error);
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

  public async updateUser(id: number, user: IUser): Promise<void> {
    try {
      await User.findOneAndUpdate({ id }, { $set: user }, { new: true });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
