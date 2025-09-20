import { statusCode404 } from '../../../interfaces/general-response';
import { IUserResponse } from '../models/interfaces/users';
import { UserRepository } from '../repositories/user-repository';

export class GetUserById {
  constructor(private repository: UserRepository) {}

  async run(id: number): Promise<IUserResponse> {
    //TODO: get from database
    const user = this.repository.getUserById(id);
    if (!user) throw statusCode404;

    return user;
  }
}
