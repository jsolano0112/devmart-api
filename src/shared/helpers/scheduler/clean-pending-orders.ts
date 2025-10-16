import cron from 'node-cron';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { CleanPendingOrders } from '../../../order/domain/use-cases/clean-pending-orders.use.case';

const repo = new RepositoryContainer();
const cleanPendingOrders = new CleanPendingOrders(repo);

// per hour
cron.schedule('0 * * * *', async () => {
  console.log('JOB RUNNING: Cleaning pending orders.');
  await cleanPendingOrders.run();
});
