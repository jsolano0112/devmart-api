import { statusCode404 } from '../../../shared/interfaces/general-response';
import { orders } from '../../../shared/mock/orders.constants';
import { IOrderResponse } from '../../application/interfaces/orders';

export class GetOrderById {
  constructor() {}

  async run(id: number): Promise<IOrderResponse> {
    const order = orders.find((u) => u.id === Number(id));
    if (!order) throw statusCode404;
    return order;
  }
}
