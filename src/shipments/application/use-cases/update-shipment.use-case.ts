import { Exception } from '../../../shared/helpers/exception-message';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { IShipmentUpdate } from '../../../shared/interfaces/shipments';
import { NotificationClient } from '../../../shared/infraestructure/socket/socket-client';

function buildNotificationPayload(status: string, trackingId: string) {
  const type = `shipment.${status.toLowerCase()}`;
  let message = `El envio ${trackingId} cambio su estado a ${status}`;
  if (status.toLowerCase() === 'PENDIENTE') {
    message = `Orden creada, esperando procesamiento`;
  }
  if (status.toLowerCase() === 'PREPARANDO') {
    message = `Orden en preparación.`;
  }
  if (status.toLowerCase() === 'EN_TRANSITO') {
    message = `Enviado, en camino al destino.`;
  }
  if (status.toLowerCase() === 'EN_ENTREGA') {
    message = `En vehículo de reparto para entrega.`;
  }
  if (status.toLowerCase() === 'ENTREGADO') {
    message = `Confirmado recibido por el cliente.`;
  }
  if (status.toLowerCase() === 'CANCELADO') {
    message = `Orden cancelada por cliente o admin.`;
  }
  return { type, message };
}

export class updateShipment {
  constructor(private repo: RepositoryContainer) {}

  async run(shipment: IShipmentUpdate, trackingId: string): Promise<void> {
    const dbShipment = await this.repo.shipments.getShipmentBytrackingId(
      trackingId,
    );
    if (!dbShipment) new Exception('Shipment not found', 404);

    const shipmentUpdated: IShipmentUpdate = {
      status: shipment.status ? shipment.status : dbShipment.status,
      updatedAt: shipment.updatedAt ? shipment.updatedAt : dbShipment.updatedAt,
    };
    await this.repo.shipments.updateShipment(trackingId, shipmentUpdated,);

    try {
      if (dbShipment.status !== shipmentUpdated.status) {
        const order = await this.repo.orders.getOrder(dbShipment.orderId as number);
        const userId = order?.userId;
        console.log('Notifying userId:', userId);
        if (userId) {
          const payload = buildNotificationPayload(shipmentUpdated.status || dbShipment.status, trackingId);
          console.log('Notification payload:', payload);
          const notification = {
            userId,
            message: payload.message,
            type: payload.type,
          } as any;

          NotificationClient.send(notification).catch((err: any) => console.error('Notification send error', err));
        }
      }
    } catch (e) {
      console.error('Failed to send notification for shipment update', e);
    }
  }
}
