import { userStatusCode400ErrorParameters } from "../../application/interfaces/user-response";
import { IUserRequest } from "../../application/interfaces/users";

export class CreateUser {
  constructor() {}

  async run(user: IUserRequest): Promise<void> {

    //TODO: Validate email if exists and the domain

    //TODO: save en database
  }
}
