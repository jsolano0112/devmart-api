import { Router, Request, Response } from 'express';
import { authRouter, userRouter } from './user/application/routes/user.route';
import { orderRouter } from './order/application/routes/order.route';
import { notificationRouter } from './notification/application/routes/notification.route';
import { supplierRouter } from './supplier/application/routes/supplier.route';
import { shipmentRouter } from './shipments/application/routes/shipment.route';
import { productRouter } from './product/application/routes/product.route';
import { categoryRouter } from './categories/application/routes/categories.route';
const appRouter: Router = Router();

appRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    message: 'DEVMART - API',
  });
});

appRouter.use('/api/v1/users', userRouter);
appRouter.use('/api/v1/auth', authRouter);
appRouter.use('/api/v1/orders', orderRouter);
appRouter.use('/api/v1/notifications', notificationRouter);
appRouter.use('/api/v1/suppliers', supplierRouter);
appRouter.use('/api/v1/shipments', shipmentRouter);
appRouter.use('/api/v1/categories', categoryRouter);
appRouter.use('/api/v1/products', productRouter);

export default appRouter;
