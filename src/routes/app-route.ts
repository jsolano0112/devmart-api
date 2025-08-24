import express, {Router, Request, Response} from 'express'
import userRouter from './users.route';
import orderRouter from './orders.route';
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