import { statusCode404 } from "../../../interfaces/general-response";
import { users } from "../../../mock/users.constants";
import { userStatusCode400ErrorParameters } from "../../application/interfaces/user-response";
import { IUserResponse } from "../../application/interfaces/users";

export class GetUserById {
  constructor() {}

  async run(id: number): Promise<IUserResponse> {
    //TODO: get from database
    const user = users.find((u) => u.id === Number(id));
    if (!user) throw statusCode404;

    return user;
  }
}
