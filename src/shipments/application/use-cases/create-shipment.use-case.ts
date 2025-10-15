import { Exception } from "../../../shared/helpers/exception-message";
import { RepositoryContainer } from "../../../shared/infraestructure/respository-container";
import { IShipment } from "../../domain/models/interfaces/shipments";
import { trackingNumberStatusCode409ExistingTrackingNumber } from "../../domain/models/interfaces/shipments-response";

export class CreateShipment {
  constructor(private repo: RepositoryContainer) {}

  async run(shipment: IShipment): Promise<void> {
    const existingShipment = await this.repo.shipments.getShipmentBytrackingId(shipment.trackingId);
    if (existingShipment) throw new Exception('The shipment already exists.', 409);
    this.repo.shipments.createShipment(shipment);
  }
}
