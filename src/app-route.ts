import { Router, Request, Response } from 'express';
import { authRouter, userRouter } from './user/application/routes/user.route';
import { orderRouter } from './order/application/routes/order.route';
import { notificationRouter } from './notification/application/routes/notification.route';
import { supplierRouter } from './supplier/application/routes/supplier.route';
import { shipmentRouter } from './shipments/application/routes/shipment.route';
import { categoryRouter } from './categories/application/routes/categories.route';
import { productRouter } from './product/application/routes/product.route';
const appRouter: Router = Router();

appRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    message: 'DEVMART - API',
  });
});

appRouter.use('/users', userRouter);
appRouter.use('/auth', authRouter);
appRouter.use('/orders', orderRouter);
appRouter.use('/notifications', notificationRouter);
appRouter.use('/suppliers', supplierRouter);
appRouter.use('/shipments', shipmentRouter);
appRouter.use('/categories', categoryRouter);
appRouter.use('/products', productRouter);

export default appRouter;
