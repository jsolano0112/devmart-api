import { RepositoryContainer } from '../../shared/infraestructure/respository-container';
import { CreateShipment } from '../application/use-cases/create-shipment.use-case';
import { DeleteShipment } from '../application/use-cases/delete-shipment.use-case';
import { GetShipments } from '../application/use-cases/get-shipments.use-case';
import { GetShipmentByTrackingId } from '../application/use-cases/getShipmentByTrackingId.use-case';
import { updateShipment } from '../application/use-cases/update-shipment.use-case';

const repositories = new RepositoryContainer();

export const ShipmentServiceContainer = {
  createShipment: new CreateShipment(repositories),
  updateShipment: new updateShipment(repositories),
  getShipmentByTrackingId: new GetShipmentByTrackingId(repositories),
  getShipments: new GetShipments(repositories),
  deleteShipment: new DeleteShipment(repositories),
};
