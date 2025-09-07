export interface IOrderResponse {
  id: number;
  userId: number;
  products: IProduct[];
  paymentMethod: number;
  total: number;
  address: string;
  created: Date;
  lastUpdated: Date;
}

export interface IOrderRequest {
  id: number;
  userId: number;
  products: IProduct[];
  paymentMethod: number;
  address: string;
}

export interface IProduct {
  id: number;
  count: number;
  sellerId: number;
}
