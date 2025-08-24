import express, {Router, Request, Response} from 'express'
import { users } from '../mock-data/users.constants';

const userRouter: Router = express.Router();


userRouter.get('/users', (request: Request, response: Response)=>{
     response.json({
        ok: true, 
        data: [users]
     })
});

userRouter.post('/users', (request: Request, response: Response)=>{
     response.json({
        ok: true, 
        status: 'created',
        data: users[0]
     })
});

export default userRouter;