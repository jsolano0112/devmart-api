import { seedNotifications } from '../../notification/domain/seeders/seed-notifications';
import { dbConnection } from '../infraestructure/db/mongodb.config';

(async () => {
  await dbConnection();
  await seedNotifications();
  console.log('✅ All seeders completed.');
  process.exit(0);
})();
