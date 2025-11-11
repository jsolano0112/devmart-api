import { Exception } from '../../../shared/helpers/exception-message';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { ICreateShipmentResult, IShipment } from '../../../shared/interfaces/shipments';

export class CreateShipment {
  constructor(private repo: RepositoryContainer) { }

  async run(shipment: IShipment): Promise<ICreateShipmentResult> {
    // const existingShipment = await this.repo.shipments.getShipmentBytrackingId(
    //   shipment.trackingId,
    // );
    // if (existingShipment)
    //   throw new Exception('The trackingNumber already exists.', 409);
    const result = this.repo.shipments.createShipment(shipment);
    return result;
  }
}
