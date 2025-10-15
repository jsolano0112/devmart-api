export interface IProductResponse {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string;
  sku: string;
  category: string;
}

export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string;
  sku: string;
  category: string;
}

export interface IUpdateProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string;
  category: string;
}

export interface IProducParams {
  sku: string;
}
