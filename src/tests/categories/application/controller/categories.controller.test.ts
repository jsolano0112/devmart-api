import { createRequest, createResponse } from "node-mocks-http";
import { CategoriesController } from "../../../../categories/application/controller/categories.controller";

jest.mock("../../../../categories/infraestructure/categories-service-container", () => ({
    CategoriesServiceContainer: {
        createCategory: { run: jest.fn() },
        getCategories: { run: jest.fn(async () => ({
            categories: [{
                id: 1,
                name: "Category 1",
                createdAt: "2023-01-01T00:00:00Z",
                updatedAt: "2023-01-01T00:00:00Z"
            }],
            total: 1
        })) },
        getCategoryByName: { run: jest.fn(async (name) => ({ id: 1, name: "Category 1", createdAt: "2023-01-01T00:00:00Z", updatedAt: "2023-01-01T00:00:00Z" })) },
        updateCategory: { run: jest.fn() },
        deleteCategory: { run: jest.fn() },
    }
}));

describe("CategoriesController test", () => {

    describe("POST /categories create a category", () => {
        test("should create a category", async () => {

            const mocksCategory = {
                name: "Category 1",
                description: "Description 1"
            }; 

            const req = createRequest({
                method: "POST",
                url: "/categories",
                body: mocksCategory
            });
            
            const res = createResponse();

            const categoriesController = new CategoriesController();

            await categoriesController.createCategory(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toBe("Category created.");
        });
    });

    describe("GET /categories/:name", () => {

        test("should return a category by name", async () => {
            const req = createRequest({
                method: "GET",
                url: "/categories/Category 1",
                params: { name: "Category 1" }
            });

            const res = createResponse();

            const categoriesController = new CategoriesController();

            await categoriesController.getCategoryByName(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({
                id: 1,
                name: "Category 1",
                createdAt: "2023-01-01T00:00:00Z",
                updatedAt: "2023-01-01T00:00:00Z"
            });
        });
    });

    describe("PUT /categories/:name", () => {
        test("should update a category by name", async () => {
            const req = createRequest({
                method: "PUT",
                url: "/categories/Category 1",
                params: { name: "Category 1" },
                body: {
                    description: "Updated Description"
                }
            });

            const res = createResponse();

            const categoriesController = new CategoriesController();

            await categoriesController.updateCategory(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toBe("Category updated.");
        });
    });

    describe("DELETE /categories/:name", () => {
        test("should delete a category by name", async () => {
            const req = createRequest({
                method: "DELETE",
                url: "/categories/Category 1",
                params: { name: "Category 1" }
            });

            const res = createResponse();

            const categoriesController = new CategoriesController();

            await categoriesController.deleteCategoryById(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toBe("Category deleted.");
        });
    });

    describe("GET /categories", () => {
        test("should return all categories", async () => {
            const req = createRequest({
                method: "GET",
                url: "/categories"
            });

            const res = createResponse();

            const categoriesController = new CategoriesController();

            await categoriesController.getAllCategories(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({
                categories: [{
                    id: 1,
                    name: "Category 1",
                    createdAt: "2023-01-01T00:00:00Z",
                    updatedAt: "2023-01-01T00:00:00Z"
                }],
                total: 1
            });
        });
    });

});
