import { OrderStatus } from './order-status';

export interface IOrderResponse {
  id: number;
  userId: number;
  products: IProduct[];
  paymentMethod: number;
  total: number;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  status: OrderStatus;
}

export interface IUserOrderResponse {
  id: number;
  userId: number;
  count: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  status: OrderStatus;
}

export interface IOrder {
  id: number;
  userId: number;
  products: IProduct[];
  paymentMethod: number;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: OrderStatus;
}

export interface IUpdateOrder {
  id: number;
  products: IProduct[];
  paymentMethod: number;
  address: string;
  status: OrderStatus;
}

export interface IProduct {
  sku: string;
  count: number;
  sellerId: number;
}
