export interface IOrderResponse {
  id: string;
  userId: string;
  products: IProduct[];
  paymentMethod: number;
  total: number;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserOrderResponse {
  id: string;
  userId: string;
  count: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder {
  userId: string;
  products: IProduct[];
  paymentMethod: number;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUpdateOrder {
  id: string;
  products: IProduct[];
  paymentMethod: number;
  address: string;
}

export interface IProduct {
  id: string;
  count: number;
  sellerId: number;
}
