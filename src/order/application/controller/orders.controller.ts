import { Request, Response, NextFunction } from 'express';
import { OrderServiceContainer } from '../../infraestructure/order-service-container';
import { IOrder, IUpdateOrder } from '../../../shared/interfaces/orders';

export class OrderController {
  public async getById(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = request.params;
      const order = await OrderServiceContainer.getOrderById.run(Number(id));
      return response.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  public async create(
    request: Request<null, void, IOrder>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await OrderServiceContainer.createOrder.run(request.body);
      return response.status(200).json('Order created.');
    } catch (error) {
      next(error);
    }
  }

  public async update(
    request: Request<null, void, IUpdateOrder>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await OrderServiceContainer.updateOrder.run(request.body);
      return response.status(200).json('Order Updated');
    } catch (error) {
      next(error);
    }
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = request.params;
      await OrderServiceContainer.deleteOrder.run(Number(id));
      return response.status(200).json('Order deleted.');
    } catch (error) {
      next(error);
    }
  }

  public async cancel(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = request.params;
      await OrderServiceContainer.cancelOrder.run(Number(id));
      return response.status(200).json('Order cancelled.');
    } catch (error) {
      next(error);
    }
  }
}
