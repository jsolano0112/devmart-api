import { statusCode404 } from "../../../interfaces/general-response";
import { IOrderResponse } from "../../../order/application/interfaces/orders";
import { orders } from "../../../mock/orders.constants";
import { usersFromDatabase } from "../../../mock/users.constants";
import { userStatusCode400ErrorParameters } from "../../application/interfaces/user-response";
import { IUserRequest } from "../../application/interfaces/users";

export class GetUserOrders {
  constructor() {}

  async run(id: number): Promise<IOrderResponse[]> {
    //TODO: get from database
    let dbUser = usersFromDatabase.find((u) => u.id ===  Number(id));
    if (!dbUser) throw statusCode404;

    //TODO: get from database
    return orders.filter((u) => u.userId ===  Number(id));
  }
}
