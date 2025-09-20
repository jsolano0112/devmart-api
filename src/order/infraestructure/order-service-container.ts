//TODO: for database
// const Repository

import { CreateOrder } from '../domain/use-cases/create-order.user.case';
import { DeleteOrder } from '../domain/use-cases/delete-order.use.case';
import { GetOrderById } from '../domain/use-cases/get-order.use.case';
import { UpdateOrder } from '../domain/use-cases/update-order.user.case';

export const OrderServiceContainer = {
  getOrderById: new GetOrderById(),
  createOrder: new CreateOrder(),
  updateOrder: new UpdateOrder(),
  deleteOrder: new DeleteOrder(),
};
