import { model, Schema } from 'mongoose';
import { IProduct } from '../../../shared/interfaces/products';

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  images: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  categoryId: { type: Number, required: true },
  supplierId: { type: Number, required: true },
});

export const Product = model<IProduct>('Product', productSchema);
