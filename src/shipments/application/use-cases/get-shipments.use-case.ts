import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { IShipment } from '../../../shared/interfaces/shipments';

export class GetShipments {
  constructor(private repo: RepositoryContainer) {}

  async run(): Promise<IShipment[]> {
    return this.repo.shipments.getAllShipmentsData();
  }
}
