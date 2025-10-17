import { RepositoryContainer } from '../../shared/infraestructure/respository-container';
import { CancelOrder } from '../application/use-cases/cancel-order.use.case';
import { CreateOrder } from '../application/use-cases/create-order.user.case';
import { DeleteOrder } from '../application/use-cases/delete-order.use.case';
import { GetOrderById } from '../application/use-cases/get-order.use.case';
import { GetUserOrders } from '../application/use-cases/get-user-orders.use.case';
import { UpdateOrder } from '../application/use-cases/update-order.user.case';

const repositories = new RepositoryContainer();

export const OrderServiceContainer = {
  getOrderById: new GetOrderById(repositories),
  createOrder: new CreateOrder(repositories),
  updateOrder: new UpdateOrder(repositories),
  deleteOrder: new DeleteOrder(repositories),
  cancelOrder: new CancelOrder(repositories),
  getUserOrders: new GetUserOrders(repositories),
};
