import { Exception } from '../../../shared/helpers/exception-message';
import {
  IProduct,
  IProductResponse,
} from '../../../shared/interfaces/products';
import { Product } from '../models/product.schema';

export class ProductRepository {
  public async createProduct(product: IProduct): Promise<void> {
    try {
      const newProduct = new Product(product);
      await newProduct.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getAllProductsData(): Promise<IProduct[]> {
    try {
      const products = await Product.find();
      if (products.length === 0) throw new Exception('No products found.', 404);

      const availableProducts = products.filter((p) => p.stock > 0);

      return availableProducts.map((p) => ({
        id: p._id,
        name: p.name,
        description: p.description,
        price: p.price,
        stock: p.stock,
        images: p.images,
        sku: p.sku,
        categoryId: p.categoryId,
        supplierId: p.supplierId,
      }));
    } catch (error) {
      throw error;
    }
  }

  public async getProductBySku(sku: string): Promise<IProductResponse> {
    try {
      return await Product.findOne({ sku });
    } catch (error) {
      throw error;
    }
  }

  public async getProductsBySkus(skus: string[]) {
    try {
      return await Product.find({ sku: { $in: skus } }).lean();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async updateProduct(sku: string, product: IProduct): Promise<void> {
    try {
      await Product.findOneAndUpdate({ sku }, { $set: product }, { new: true });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async deleteProduct(sku: string): Promise<void> {
    try {
      const result = await Product.deleteOne({ sku });
      if (result.deletedCount === 0)
        throw new Exception('Product not found.', 404);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async incrementStock(sku: string, quantity: number) {
    await Product.updateOne({ sku }, { $inc: { stock: quantity } });
  }
}
