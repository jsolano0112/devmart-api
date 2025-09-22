import { OrderRepository } from '../../order/domain/repositories/order-repository';
import { UserRepository } from '../../user/domain/repositories/user-repository';

export class RepositoryContainer {
  public readonly users: UserRepository;
  public readonly orders: OrderRepository;
  constructor() {
    this.users = new UserRepository();
    this.orders = new OrderRepository();
  }
}
