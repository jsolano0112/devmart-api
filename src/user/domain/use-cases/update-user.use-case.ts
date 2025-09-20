import { statusCode404 } from '../../../interfaces/general-response';
import { usersFromDatabase } from '../../../mock/users.constants';
import { IUser } from '../models/interfaces/users';
import { UserRepository } from '../repositories/user-repository';

export class UpdateUser {
  constructor(private repository: UserRepository) {}

  async run(user: IUser): Promise<void> {
    //TODO: get from database
    let dbUser = usersFromDatabase.find((u) => u.id === Number(user.id));
    if (!dbUser) throw statusCode404;

    //TODO: Validate email if exists and the domain

    dbUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      mobilePhone: user.mobilePhone,
      address: user.address,
      zipCode: user.zipCode,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      password: user.password,
    };
    //TODO: save en database
  }
}
