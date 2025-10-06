import { validateEmailDomain } from '../../../shared/helpers/email-domain-validator';
import { Exception } from '../../../shared/helpers/exception-message';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { IUpdateUser, IUser } from '../../../shared/interfaces/users';
import bcrypt from 'bcryptjs';

export class UpdateUser {
  constructor(private repo: RepositoryContainer) {}

  async run(user: IUpdateUser): Promise<void> {
    const dbUser = await this.repo.users.getAllUserDataById(user.id);
    await validateEmailDomain(user.email);
    if (dbUser.email !== user.email) {
      const existingUser = await this.repo.users.getUserByEmail(user.email);
      if (existingUser) throw new Exception('The user already exists.', 409);
    }

    if (user.password != '' && user.password != null) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
    }

    const userUpdated: IUser = {
      email: user.email ? user.email : dbUser.email,
      firstName: user.firstName ? user.firstName : dbUser.firstName,
      lastName: user.lastName ? user.lastName : dbUser.lastName,
      city: user.city ? user.city : dbUser.city,
      mobilePhone: user.mobilePhone ? user.mobilePhone : dbUser.mobilePhone,
      address: user.address ? user.address : dbUser.address,
      zipCode: user.zipCode ? user.zipCode : dbUser.zipCode,
      isActive: user.isActive,
      isAdmin: dbUser.isAdmin,
      password: user.password ? user.password : dbUser.password,
    };
    await this.repo.users.updateUser(user.id, userUpdated);
  }
}
