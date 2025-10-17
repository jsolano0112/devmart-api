import { OrderStatus } from '../../../shared/interfaces/order-status';
import { OrderSchema } from '../../domain/models/order.schema';
export const seedOrders = async () => {
  console.log('🌱 Initializing order seeders...');

  const orders = [
    {
      id: 1,
      userId: 1, // John Doe
      products: [
        { sku: 'MOUSE-LOGI-M185', count: 2 },
        { sku: 'KEYB-REDR-KUMARA', count: 1 },
      ],
      paymentMethod: 1, // Example: 1 = Credit Card
      address: '742 Evergreen Terrace',
      status: OrderStatus.PREPARANDO,
    },
    {
      id: 2,
      userId: 2, // Jane Smith
      products: [
        { sku: 'MONI-SAMS-27C', count: 1 },
        { sku: 'LAPT-HP-PAV15', count: 1 },
      ],
      paymentMethod: 2, // Example: 2 = Bank Transfer
      address: 'Av. Principal 123',
      status: OrderStatus.EN_TRANSITO,
    },
    {
      id: 3,
      userId: 3, // Carlos González
      products: [{ sku: 'KEYB-REDR-KUMARA', count: 1 }],
      paymentMethod: 3, // Example: 3 = Cash on Delivery
      address: 'Calle 8 #15-22',
      status: OrderStatus.ENTREGADO,
    },
  ];

  await OrderSchema.deleteMany({});
  console.log('🧽 Previous orders deleted.');

  await OrderSchema.insertMany(orders);

  console.log(`✅ ${orders.length} orders inserted successfully.`);
};
