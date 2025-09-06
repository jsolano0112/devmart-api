import { statusCode404 } from "../../../interfaces/general-response";
import { IOrderResponse } from "../../../interfaces/orders";
import { orders } from "../../../mock/orders.constants";
import { usersFromDatabase } from "../../../mock/users.constants";
import { userStatusCode400ErrorParameters } from "../../application/interfaces/user-response";
import { IUserRequest } from "../../application/interfaces/users";

export class GetUserOrders {
  constructor() {}

  async run(id: string): Promise<IOrderResponse[]> {
    //TODO: get from database
    let dbUser = usersFromDatabase.find((u) => u.id === parseInt(id));
    if (!dbUser) throw statusCode404;

    //TODO: get from database
    return orders.filter((u) => u.userId === parseInt(id));
  }
}
