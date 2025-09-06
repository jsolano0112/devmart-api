import express, {Router, Request, Response} from 'express'
// import orderRouter from './order/orders.route';
import { userRouter } from './user/application/routes/user-route';
const appRouter: Router = Router();

appRouter.get('/', (req:Request, res: Response)=>{
res.status(200).json({
    ok: true,
    message: 'DEVMART - API'
});
});

appRouter.use('/api/users', userRouter);
// appRouter.use('/api/orders', orderRouter);

export default appRouter;