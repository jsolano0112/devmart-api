import { Exception } from '../../../shared/helpers/exception-message';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { IUpdateOrder } from '../../../shared/interfaces/orders';

export class UpdateOrder {
  constructor(private repo: RepositoryContainer) {}

  async run(order: IUpdateOrder, id: number): Promise<void> {
    const dbOrder = await this.repo.orders.getOrder(id);
    if (!dbOrder) throw new Exception('Order not found.', 404);

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
    const orderUpdated: IUpdateOrder = {
      products: order.products,
      paymentMethod: order.paymentMethod,
      address: order.address,
      status: order.status,
    };

    await this.repo.orders.updateOrder(id, orderUpdated);

    for (const item of order.products) {
      const product = await this.repo.products.getProductBySku(item.sku);
      product.stock -= item.count;
      await this.repo.products.updateProduct(product.sku, product);
    }
  }
}
