import { Shipment } from '../../domain/models/shipments.schema';

/**
 * Envíos alineados con los pedidos sembrados: orderId 1–3.
 * `orderId` referencia `Order.id`; el estado refleja el flujo del pedido.
 */
export const seedShipments = async () => {
  console.log('🌱 Initializing shipment seeders...');

  const shipments = [
    {
      id: 1,
      orderId: 1,
      status: 'EN_TRANSITO',
      trackingId: 'TRK-20260329-10001',
      carrier: 'Servientrega',
    },
    {
      id: 2,
      orderId: 2,
      status: 'EN_ENTREGA',
      trackingId: 'TRK-20260329-10002',
      carrier: 'Coordinadora',
    },
    {
      id: 3,
      orderId: 3,
      status: 'ENTREGADO',
      trackingId: 'TRK-20260329-10003',
      carrier: 'Interrapidísimo',
    },
  ];

  await Shipment.deleteMany({});
  console.log('🧽 Previous shipments deleted.');

  await Shipment.insertMany(shipments);

  console.log(`✅ ${shipments.length} shipments inserted successfully.`);
};
