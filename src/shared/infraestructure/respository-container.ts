import { CategoriesRepository } from '../../categories/dominio/repositories/categories-repository';
import { OrderRepository } from '../../order/domain/repositories/order.repository';
import { ProductRepository } from '../../product/domain/repositories/product.repository';
import { ShipmentRepository } from '../../shipments/domain/repositories/shipment-repository';
import { SupplierRepository } from '../../supplier/domain/repositories/supplier-repository';

export class RepositoryContainer {
  public readonly orders: OrderRepository;
  public readonly products: ProductRepository;
  public readonly categories: CategoriesRepository;
  public readonly shipments: ShipmentRepository;
  public readonly suppliers: SupplierRepository;

  constructor() {
    this.orders = new OrderRepository();
    this.products = new ProductRepository();
    this.categories = new CategoriesRepository();
    this.shipments = new ShipmentRepository();
    this.suppliers = new SupplierRepository();
  }
}
