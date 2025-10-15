export interface IProductResponse {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string;
  sku: string;
  supplierId: number;
  categoryId: number;
}

export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string;
  sku: string;
  categoryId: number;
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
  categoryId: number;
  supplierId: number;
}
