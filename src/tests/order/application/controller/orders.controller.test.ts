import { createRequest, createResponse } from "node-mocks-http";

// import { OrderServiceContainer } from "../../../../../order/infraestructure/order-service-container";
// import { IOrder, IUpdateOrder } from "../../../../../shared/interfaces/orders";
import { OrderController } from "../../../../order/application/controller/orders.controller";

jest.mock("../../../../order/infraestructure/order-service-container", () => ({
    OrderServiceContainer: {
        getOrderById: { run: jest.fn(async (id: number) => ({ id: 1, userId: 1, products: "Laptop", paymentMethod: 1, address: "av 123", createdAt: "2023-01-01T00:00:00Z", updatedAt: "2023-01-01T00:00:00Z", status: "OK", total: 126000 })) },
        createOrder: { run: jest.fn(async (order) => order) },
        updateOrder: { run: jest.fn() },
        deleteOrder: { run: jest.fn() },
        cancelOrder: { run: jest.fn() },
    },
}));

describe("OrderController test", () => {

    describe("GET /orders/:id get order by id", () => {
        test("should return order by id", async () => {
            const req = createRequest({
                method: "GET",
                url: "/orders/1",
                params: { id: "1" },
            });
            const res = createResponse();

            const orderController = new OrderController();

            await orderController.getById(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({ id: 1, userId: 1, products: "Laptop", paymentMethod: 1, address: "av 123", createdAt: "2023-01-01T00:00:00Z", updatedAt: "2023-01-01T00:00:00Z", status: "OK", total: 126000 });
        });
    });

    describe("POST /orders create order", () => {
        test("should create a new order", async () => {
            const req = createRequest({
                method: "POST",
                url: "/orders",
                body: {
                    id: 1,
                    product: "Laptop",
                    paymentMethod: 1,
                    address: "av 123",
                    createdAt: "2023-01-01T00:00:00Z",
                    updatedAt: "2023-01-01T00:00:00Z",
                    status: "OK",
                    total: 126000
                },
            });
            const res = createResponse();

            const orderController = new OrderController();

            await orderController.create(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getData()).toBe('"Order created."');
        });
    });

    describe("PUT /orders update order", () => {
        test("should update an order", async () => {
            const req = createRequest({
                method: "PUT",
                url: "/orders",
                params: { id: 1 },
                body: {
                    products: "PC",
                    paymentMethod: "2",
                    address: "cr 123",
                    status: "IN PROCESS"
                },
            });
            const res = createResponse();

            const orderController = new OrderController();

            await orderController.update(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toBe("Order Updated");
        });
    });

      describe("DELETE /orders/:id delete order", () => {
        test("should delete an order", async () => {
          const req = createRequest({
            method: "DELETE",
            url: "/orders/1",
            params: { id: "1" },
          });
          const res = createResponse();

          const orderController = new OrderController();

          await orderController.delete(req as any, res as any, jest.fn());

          expect(res.statusCode).toBe(200);
          expect(res._getJSONData()).toBe("Order deleted.");
        });
      });

      describe("PATCH /orders/:id cancel order", () => {
        test("should cancel an order", async () => {
          const req = createRequest({
            method: "PATCH",
            url: "/orders/1/cancel",
            params: { id: "1" },
          });
          const res = createResponse();

          const orderController = new OrderController();

          await orderController.cancel(req as any, res as any, jest.fn());

          expect(res.statusCode).toBe(200);
          expect(res._getJSONData()).toBe("Order cancelled.");
        });
      });
});
