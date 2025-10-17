import cron from 'node-cron';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { CleanPendingOrders } from '../../../order/application/use-cases/clean-pending-orders.use.case';

const repo = new RepositoryContainer();
const cleanPendingOrders = new CleanPendingOrders(repo);

// per ten seconds
cron.schedule('*/10 * * * * *', async () => {
  console.log('JOB RUNNING: Cleaning pending orders.');
  try {
  await cleanPendingOrders.run();
   } catch (err) {
    console.error('JOB ERROR:', err);
  }
});
