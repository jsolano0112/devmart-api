import { statusCode404 } from '../../../interfaces/general-response';
import { orders } from '../../../mock/orders.constants';

export class DeleteOrder {
  constructor() {}

  async run(id: number): Promise<void> {
    const order = orders.find((u) => u.id === Number(id));
    if (!order) throw statusCode404;

    //TODO: delete
  }
}
