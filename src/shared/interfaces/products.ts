export interface IProductResponse {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string;
  sku: string;
  supplierId: number;
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
  supplierId: number;
}

export interface IUpdateProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string;
  sku: string;
  category: string;
  supplierId: number;
}
