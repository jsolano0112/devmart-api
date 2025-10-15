import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { Exception } from '../../../shared/helpers/exception-message';
import { IOrder } from '../../../shared/interfaces/orders';

export class CreateOrder {
  constructor(private repo: RepositoryContainer) {}

  public async run(order: IOrder): Promise<void> {
    const user = await this.repo.users.getUserById(order.userId);
    if (!user) {
      throw new Exception('User not found.', 404);
    }

    for (const item of order.products) {
      const product = await this.repo.products.getProductBySku(item.sku);

      if (!product) {
        throw new Exception(`Product with id ${item.sku} not found.`, 404);
      }

      if (product.stock < item.count) {
        throw new Exception(
          `Not enough stock for product ${product.name}. Available: ${product.stock}, requested: ${item.count}`,
          400,
        );
      }
    }

    for (const item of order.products) {
      const product = await this.repo.products.getProductBySku(item.sku);
      product.stock -= item.count;
      await this.repo.products.updateProduct(product.sku, product);
    }

    await this.repo.orders.createOrder(order);
  }
}
