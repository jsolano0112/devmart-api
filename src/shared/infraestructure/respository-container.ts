import { CategoriesRepository } from '../../categories/dominio/repositories/categories-repository';
import { NotificationRepository } from '../../notification/domain/repositories/notification.repository';
import { OrderRepository } from '../../order/domain/repositories/order-repository';
import { ProductRepository } from '../../product/domain/repositories/product-repository';
import { ShipmentRepository } from '../../shipments/domain/repositories/shipment-repository';
import { UserRepository } from '../../user/domain/repositories/user-repository';

export class RepositoryContainer {
  public readonly users: UserRepository;
  public readonly orders: OrderRepository;
  public readonly products: ProductRepository;
  public readonly categories: CategoriesRepository;
  public readonly shipments: ShipmentRepository ;
  public readonly notifications: NotificationRepository;

  constructor() {
    this.users = new UserRepository();
    this.orders = new OrderRepository();
    this.products = new ProductRepository();
    this.categories = new CategoriesRepository();
    this.shipments = new ShipmentRepository();
    this.notifications = new NotificationRepository();
  }
}
