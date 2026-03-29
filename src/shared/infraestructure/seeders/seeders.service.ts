import { seedCategories } from '../../../categories/infraestructure/seeders/category.seeder';
import { seedOrders } from '../../../order/infraestructure/seeders/order.seeder';
import { seedProducts } from '../../../product/infraestructure/seeders/product.seeder';
import { seedShipments } from '../../../shipments/infraestructure/seeders/shipment.seeder';
import { seedSuppliers } from '../../../supplier/infraestructure/seeders/supplier.seeder';
import { dbConnection } from '../db/mongodb.config';

(async () => {
  await dbConnection();
  const categories = await seedCategories();
  await seedSuppliers();
  await seedProducts(categories);
  await seedOrders();
  await seedShipments();
  console.log('✅ All seeders completed.');
  process.exit(0);
})();
