import { IOrderRequest } from '../../application/interfaces/orders';

export class CreateOrder {
  constructor() {}

  async run(user: IOrderRequest): Promise<void> {
    //TODO: save en database
  }
}
