import { Exception } from '../../../shared/helpers/exception-message';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { IOrderResponse } from '../../../shared/interfaces/orders';

export class GetOrderById {
  constructor(private repo: RepositoryContainer) {}

  async run(id: number): Promise<IOrderResponse> {
    const order = await this.repo.orders.getOrder(id);
    if (!order) throw new Exception('Order not found.', 404);

    const {
      userId,
      products,
      paymentMethod,
      address,
      createdAt,
      updatedAt,
      status,
    } = order;

    let total = 0;

    for (const item of products) {
      const product = await this.repo.products.getProductBySku(item.sku);
      if (product) {
        total += product.price * item.count;
      }
    }

    return {
      id,
      userId,
      products,
      paymentMethod,
      address,
      createdAt,
      updatedAt,
      status,
      total,
    };
  }
}
