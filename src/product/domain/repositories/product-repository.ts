import { statusCode404 } from '../../../shared/interfaces/general-response';
import { IProduct, IProductResponse } from '../models/interfaces/products';
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
      if (products.length === 0) throw statusCode404;

      const availableProducts = products.filter((p) => p.stock > 0);

      return availableProducts.map((p) => ({
        id: p._id,
        name: p.name,
        description: p.description,
        price: p.price,
        stock: p.stock,
        images: p.images,
        sku: p.sku,
        category: p.category,
      }));
    } catch (error) {
      throw error;
    }

  }

  public async getProductBySku(sku: string): Promise<IProductResponse> {
    try {
      const product = await Product.findOne({ sku });
      if (!product) throw statusCode404;
      if (product.stock === 0) {
        throw { statusCode: 404, message: 'Product out of stock'};
      }
      const { name, description, price, stock, images, category } = product;
      return {
        name,
        description,
        price,
        stock,
        images,
        sku,
        category
      };
    } catch (error) {
      throw error;
    }
  }

  public async updateProduct(sku: string, product: IProduct): Promise<void> {
    try {
      await Product.findByIdAndUpdate(sku, { $set: product }, { new: true });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async deleteProduct(sku: string): Promise<void> {
    try {
      const result = await Product.deleteOne({ sku });
      if (result.deletedCount === 0) throw statusCode404;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
