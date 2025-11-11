import { Exception } from '../../../shared/helpers/exception-message';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { IShipmentUpdate } from '../../../shared/interfaces/shipments';

export class updateShipment {
  constructor(private repo: RepositoryContainer) {}

  async run(shipment: IShipmentUpdate, trackingId: string): Promise<void> {
    const dbShipment = await this.repo.shipments.getShipmentBytrackingId(
      trackingId,
    );
    if (!dbShipment) new Exception('Shipment not found', 404);

    const shipmentUpdated: IShipmentUpdate = {
      // trackingId: shipment.trackingId? shipment.trackingId: dbShipment.trackingId,
      status: shipment.status ? shipment.status : dbShipment.status,
      updatedAt: shipment.updatedAt ? shipment.updatedAt : dbShipment.updatedAt,
    };
    await this.repo.shipments.updateShipment(trackingId, shipmentUpdated,);
  }
}
