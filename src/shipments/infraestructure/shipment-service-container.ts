import { RepositoryContainer } from '../../shared/infraestructure/respository-container';
import { CreateShipment } from '../domain/use-cases/create-shipment.use-case';
import { DeleteShipment } from '../domain/use-cases/delete-shipment.use-case';
import { GetShipments } from '../domain/use-cases/get-shipments.use-case';
import { GetShipmentByTrackingId } from '../domain/use-cases/getShipmentByTrackingId.use-case';
import { updateShipment } from '../domain/use-cases/update-shipment.use-case';

const repositories = new RepositoryContainer();

export const ShipmentServiceContainer = {
  createShipment: new CreateShipment(repositories),
  updateShipment: new updateShipment(repositories),
  getShipmentByTrackingId: new GetShipmentByTrackingId(repositories),
  getShipments: new GetShipments(repositories),
  deleteShipment: new DeleteShipment(repositories),
};
