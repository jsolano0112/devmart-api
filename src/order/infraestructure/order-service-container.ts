import { RepositoryContainer } from '../../shared/infraestructure/respository-container';
import { CancelOrder } from '../domain/use-cases/cancel-order.use.case';
import { CreateOrder } from '../domain/use-cases/create-order.user.case';
import { DeleteOrder } from '../domain/use-cases/delete-order.use.case';
import { GetOrderById } from '../domain/use-cases/get-order.use.case';
import { UpdateOrder } from '../domain/use-cases/update-order.user.case';

const repositories = new RepositoryContainer();

export const OrderServiceContainer = {
  getOrderById: new GetOrderById(repositories),
  createOrder: new CreateOrder(repositories),
  updateOrder: new UpdateOrder(repositories),
  deleteOrder: new DeleteOrder(repositories),
  cancelOrder: new CancelOrder(repositories),
};
