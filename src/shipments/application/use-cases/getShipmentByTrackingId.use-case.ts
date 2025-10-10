import { RepositoryContainer } from "../../../shared/infraestructure/respository-container";

export class GetShipmentByTrackingId {
    constructor(private repo: RepositoryContainer) { }

    async run(trackingId: string) {
        return this.repo.shipments.getShipmentBytrackingId(trackingId);
    }
}