import { validateEmailDomain } from '../../../shared/helpers/email-domain-validator';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { userStatusCode409ExistingUser } from '../models/interfaces/user-response';
import { IUpdateUser, IUser } from '../models/interfaces/users';

export class UpdateUser {
  constructor(private repo: RepositoryContainer) {}

  async run(user: IUpdateUser): Promise<void> {
    const dbUser = await this.repo.users.getAllUserDataById(user.id);
    await validateEmailDomain(user.email);
    if (dbUser.email !== user.email) {
      const existingUser = await this.repo.users.getUserByEmail(user.email);
      if (existingUser) throw userStatusCode409ExistingUser;
    }

    const userUpdated: IUser = {
      email: user.email ? user.email : dbUser.email,
      firstName: user.firstName ? user.firstName : dbUser.firstName,
      lastName: user.lastName ? user.lastName : dbUser.lastName,
      city: user.city ? user.city : dbUser.city,
      mobilePhone: user.mobilePhone ? user.mobilePhone : dbUser.mobilePhone,
      address: user.address ? user.address : dbUser.address,
      zipCode: user.zipCode ? user.zipCode : dbUser.zipCode,
      isActive: true,
      isAdmin: dbUser.isAdmin,
      password: user.password ? user.password : dbUser.password,
    };
    await this.repo.users.updateUser(user.id, userUpdated);
  }
}
