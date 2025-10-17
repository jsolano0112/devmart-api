import { RepositoryContainer } from "../../../shared/infraestructure/respository-container";

export class DeleteShipment {
  constructor(private repositories: RepositoryContainer) {}

  public async run(trackingId: string): Promise<void> {
    await this.repositories.shipments.deleteShipment(trackingId);
    
  }
}
