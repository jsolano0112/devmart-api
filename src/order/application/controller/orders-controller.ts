import { Request, Response, NextFunction } from 'express';
import { OrderServiceContainer } from '../../infraestructure/order-service-container';
import { IOrder, IUpdateOrder } from '../../domain/models/interfaces/orders';
import { orderCreatedStatus, orderDeletedStatus, orderUpdatedStatus } from '../../domain/models/interfaces/order-response';


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
    request: Request<{}, {}, IOrder>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await OrderServiceContainer.createOrder.run(request.body);
      return response.status(200).json(orderCreatedStatus);
    } catch (error) {
      next(error);
    }
  }

  public async update(
    request: Request<{}, {}, IUpdateOrder>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await OrderServiceContainer.updateOrder.run(request.body);
      return response.status(200).json(orderUpdatedStatus);
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
      return response.status(200).json(orderDeletedStatus);
    } catch (error) {
      next(error);
    }
  }
}
