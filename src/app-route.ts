import express, {Router, Request, Response} from 'express'
import { userRouter } from './user/application/routes/user.route';
import { orderRouter } from './order/application/routes/order.route';
const appRouter: Router = Router();

appRouter.get('/', (req:Request, res: Response)=>{
res.status(200).json({
    ok: true,
    message: 'DEVMART - API'
});
});

appRouter.use('/api/users', userRouter);
appRouter.use('/api/orders', orderRouter);

export default appRouter;