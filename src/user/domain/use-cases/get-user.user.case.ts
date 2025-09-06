import { statusCode404 } from "../../../interfaces/general-response";
import { users } from "../../../mock/users.constants";
import { userStatusCode400ErrorParameters } from "../../application/interfaces/user-response";
import { IUserResponse } from "../../application/interfaces/users";

export class GetUserById {
  constructor() {}

  async run(id: string): Promise<IUserResponse> {
    if (!id) throw userStatusCode400ErrorParameters;

    //TODO: get from database
    const user = users.find((u) => u.id === parseInt(id));
    if (!user) throw statusCode404;

    return user;
  }
}
