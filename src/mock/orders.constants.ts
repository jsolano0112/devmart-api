import { IOrderResponse, IProduct } from "../order/application/interfaces/orders";


export const paymentMethodTypes = {
  1: 'cash',
  2: 'card',
  3: 'bank transfer'
};

export const products: IProduct[] = [
  {
    id: 1,
    count: 2,
    sellerId: 1,
  },
  {
    id: 1,
    count: 2,
    sellerId: 1,
  },
];

export const orders: IOrderResponse[] = [
  {
    id: 1,
    userId: 1,
    products: products,
    paymentMethod: 2,
    total: 400.0,
    address: "Calle 39C #XX - XX",
    created: new Date("2013-07-02T21:36:25.344Z"),
    lastUpdated: new Date("2013-07-02T21:36:25.344Z"),
  },
  {
    id: 1,
    userId: 1,
    products: products,
    paymentMethod: 2,
    total: 400.0,
    address: "Calle 39C #XX - XX",
    created: new Date("2013-07-02T21:36:25.344Z"),
    lastUpdated: new Date("2013-07-02T21:36:25.344Z"),
  },
];
