import { createRequest, createResponse } from "node-mocks-http";
import { ShipmentController } from "../../../../shipments/application/controller/shipment.controller";

jest.mock("../../../../shipments/infraestructure/shipment-service-container", () => ({
    ShipmentServiceContainer: {
        createShipment: { run: jest.fn() },
        getShipments: { run: jest.fn(async () => ({
            shipments: [{
                id: 1,
                orderId: 1,
                status: "In Transit",
                trackingNumber: "TRACK123",
                carrier: "CarrierX",
                shippedDate: "2025-10-17T06:23:59.206Z",
                deliveryDate: null
            }],
            total: 1
        })) },
        getShipmentByTrackingId: { run: jest.fn(async (trackingId) => ({ id: 1, orderId: 1, status: "In Transit", trackingNumber: trackingId, carrier: "CarrierX", shippedDate: "2025-10-17T06:23:59.206Z", deliveryDate: null })) },
        updateShipment: { run: jest.fn() },
        deleteShipment: { run: jest.fn() },
    }
}));

describe("ShipmentController test", () => {

    describe("GET /shipments get all shipments", () => {
        test("should get all shipments", async () => {
            const req = createRequest({
                method: "GET",
                url: "/shipments",
            });

            const res = createResponse();

            const shipmentController = new ShipmentController();
            await shipmentController.getShipments(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(expect.objectContaining({
                shipments: expect.arrayContaining([expect.objectContaining({
                    id: 1,
                    orderId: 1,
                    status: "In Transit",
                    trackingNumber: "TRACK123",
                    carrier: "CarrierX",
                    shippedDate: "2025-10-17T06:23:59.206Z",
                    deliveryDate: null
                })]),
                total: 1
            }));
        });
    });

    describe("GET /shipments/:trackingId get shipment by trackingId", () => {
        test("should get shipment by trackingId", async () => {
            const req = createRequest({
                method: "GET",
                url: "/shipments/TRACK123",
                params: { trackingId: 'TRACK123' }
            });

            const res = createResponse();

            const shipmentController = new ShipmentController();
            await shipmentController.GetShipmentByTrackingId(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(expect.objectContaining({
                id: 1,
                orderId: 1,
                status: "In Transit",
                trackingNumber: "TRACK123",
                carrier: "CarrierX",
                shippedDate: "2025-10-17T06:23:59.206Z",
                deliveryDate: null
            }));
        });
    });

    describe("POST /shipments create shipment", () => {
        test("should create a shipment", async () => {
            const req = createRequest({
                method: "POST",
                url: "/shipments",
                body: {
                    orderId: 1,
                    status: "In Transit",
                    trackingNumber: "TRACK123",
                    carrier: "CarrierX",
                    shippedDate: "2025-10-17T06:23:59.206Z",
                    deliveryDate: null
                }
            });

            const res = createResponse();

            const shipmentController = new ShipmentController();
            await shipmentController.create(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(
                "Shipment created successfully."
            );
        });
    });

    describe("PUT /shipments/:trackingId update shipment", () => {
        test("should update a shipment", async () => {
            const req = createRequest({
                method: "PUT",
                url: "/shipments/TRACK123",
                params: { trackingId: 'TRACK123' },
                body: {
                    status: "Delivered",
                    deliveryDate: "2025-10-18T06:23:59.206Z"
                }
            });

            const res = createResponse();

            const shipmentController = new ShipmentController();
            await shipmentController.update(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(
                "Shipment updated successfully."
            );
        });
    });

    describe("DELETE /shipments/:trackingId delete shipment", () => {
        test("should delete a shipment", async () => {
            const req = createRequest({
                method: "DELETE",
                url: "/shipments/TRACK123",
                params: { trackingId: 'TRACK123' }
            });

            const res = createResponse();

            const shipmentController = new ShipmentController();
            await shipmentController.delete(req as any, res as any, jest.fn());

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(
                "Shipment deleted."
            );
        });
    });
});
