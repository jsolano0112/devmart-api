import { Request, Response, NextFunction } from 'express';
import { OrderServiceContainer } from '../../infraestructure/order-service-container';
import { IOrderRequest } from '../interfaces/orders';
import {
  orderCreatedStatus,
  orderDeletedStatus,
  orderUpdatedStatus,
} from '../interfaces/order-response';

//TODO: review the response of every one
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
    request: Request<{}, {}, IOrderRequest>,
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
    request: Request<{}, {}, IOrderRequest>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await OrderServiceContainer.createOrder.run(request.body);
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
