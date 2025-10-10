import { RepositoryContainer } from "../../../shared/infraestructure/respository-container";
import { statusCode404 } from "../../../shared/interfaces/general-response";
import { IShipmentUpdate } from "../../domain/models/interfaces/shipments";

export class updateShipment {
    constructor(private repo: RepositoryContainer) { }

    async run(shipment: IShipmentUpdate): Promise<void> {
        const dbShipment = await this.repo.shipments.getShipmentBytrackingId(shipment.trackingId);
        if (!dbShipment) throw statusCode404;

        const shipmentUpdated: IShipmentUpdate = {
        trackingId: shipment.trackingId ? shipment.trackingId : dbShipment.trackingId,
          status: shipment.status ? shipment.status : dbShipment.status,
          updatedAt: shipment.updatedAt ? shipment.updatedAt : dbShipment.updatedAt,
        };
        await this.repo.shipments.updateShipment(shipment.trackingId, shipmentUpdated);
    }
}