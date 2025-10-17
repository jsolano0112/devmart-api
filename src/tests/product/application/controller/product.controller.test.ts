import { createRequest, createResponse } from "node-mocks-http";
import { ProductController } from "../../../../product/application/controller/product.controller";
import { IProduct, IUpdateProduct } from "../../../../shared/interfaces/products";

jest.mock("../../../../product/infraestructure/product-service-container", () => ({
    ProductServiceContainer: {
        createProduct: { run: jest.fn() },
        updateProduct: { run: jest.fn() },
        deleteProduct: { run: jest.fn() },
        getProductBySku: { run: jest.fn(async (sku) => ({ sku, name: "Sample Product", description: "This is a sample product.", price: 19.99, stock: 100, images: "image1.jpg,image2.jpg", categoryId: 1, supplierId: 1 })) },
        getProducts: { run: jest.fn(async (page, limit, search) => ({
            products: [{
                sku: 'SP1001',
                name: "Sample Product",
                description: "This is a sample product.",
                price: 19.99,
                stock: 100,
                images: "image1.jpg,image2.jpg",
                categoryId: 1,
                supplierId: 1
            }],
            total: 1
        })) }
    }
}));

describe("ProductController test", () => {

    describe("POST /products create a product", () => {
        test("should create a product", async () => {
            const mocksProduct: IProduct = {
                name: "Sample Product",
                description: "This is a sample product.",
                price: 19.99,
                stock: 100,
                images: "image1.jpg,image2.jpg",
                sku: "SP1001",
                categoryId: 1,
                supplierId: 1
            };

            const req = createRequest({
                method: "POST",
                url: "/products",
                body: mocksProduct
            });

            const res = createResponse();

            const productController = new ProductController();
            await productController.create(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual("Product created successfully.");
        });
    });

    describe("PUT /products/:sku update a product", () => {
        test("should update a product", async () => {
            const mocksProduct: IUpdateProduct = {
                name: "Sample Product",
                description: "This is a sample product.",
                price: 19.99,
                stock: 100,
                images: "image1.jpg,image2.jpg",
                categoryId: 1,
                supplierId: 1
            };

            const req = createRequest({
                method: "PUT",
                url: "/products/SP1001",
                params: { sku: 'SP1001' },
                body: mocksProduct
            });

            const res = createResponse();

            const productController = new ProductController();
            await productController.update(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual("Product updated successfully.");
        });
    });

    describe("DELETE /products/:sku delete a product", () => {
        test("should delete a product", async () => {
            const req = createRequest({
                method: "DELETE",
                url: "/products/SP1001",
                params: { sku: 'SP1001' } 
            });

            const res = createResponse();

            const productController = new ProductController();
            await productController.delete(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual("Product deleted successfully.");
        });
    });

    describe("GET /products/:sku get a product", () => {
        test("should get a product", async () => {
            const req = createRequest({
                method: "GET",
                url: "/products/SP1001",
                params: { sku: 'SP1001' }
            });

            const res = createResponse();

            const productController = new ProductController();
            await productController.getBySku(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(expect.objectContaining({
                sku: 'SP1001',
                name: "Sample Product",
                description: "This is a sample product.",
                price: 19.99,
                stock: 100,
                images: "image1.jpg,image2.jpg",
                categoryId: 1,
                supplierId: 1
            }));
        });
    });

    describe("GET /Products get all products", () => {
        test("should get all products", async () => {
            const req = createRequest({
                method: "GET",
                url: "/products",
                query: { page: '1', limit: '10', search: '' }
            });

            const res = createResponse();

            const productController = new ProductController();
            await productController.getProducts(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(expect.objectContaining({
                data: expect.arrayContaining([expect.objectContaining({
                    sku: 'SP1001',
                    name: "Sample Product",
                    description: "This is a sample product.",
                    price: 19.99,
                    stock: 100,
                    images: "image1.jpg,image2.jpg",
                    categoryId: 1,
                    supplierId: 1
                })]),
                pagination: {
                    currentPage: 1,
                    totalPages: 1,
                    totalItems: 1
                }
            }));
        });
    });

});