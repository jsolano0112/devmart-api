export interface IOrderResponse {
  id: string;
  userId: string;
  products: IProduct[];
  paymentMethod: number;
  total: number;
  address: string;
  created: Date;
  lastUpdated: Date;
}

export interface IOrder {
  userId: string;
  products: IProduct[];
  paymentMethod: number;
  address: string;
}

export interface IUpdateOrder {
  id: string
  products: IProduct[];
  paymentMethod: number;
  address: string;
}

export interface IProduct {
  id: string;
  count: number;
  sellerId: number;
}
