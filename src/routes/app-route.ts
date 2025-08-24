import express, {Router, Request, Response, response} from 'express'
import userRouter from './users.route';
const appRouter: Router = Router();

appRouter.get('/', (req:Request, res: Response)=>{
res.status(200).json({
    ok: true,
    message: 'DEVMART - API'
});
});

appRouter.use('/api', userRouter);

export default appRouter;