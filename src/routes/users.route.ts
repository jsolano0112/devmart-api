import express, {Router, Request, Response} from 'express'
import { users } from '../constants/mock/users.constants';
import { statusCode200 } from '../constants/user-response';

const userRouter: Router = express.Router();

/**
* Gets user by ID
* @param {id} - User ID 
* @return {Promise<IUserResponse>} 
*/  
userRouter.get('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return response.status(404).json({
      ok: false,
      message: 'User not found'
    });
  }

  response.json({
    ok: true,
    data: user
  });
});


//TODO THE REST
/**
/**
* Creates user
* @param {id} - User ID 
* @return {Promise<IUserResponse>} 
*/  
userRouter.post('/users', (request: Request, response: Response)=>{
     response.status(statusCode200.statusCode).json(statusCode200);
});


/**
* Updates user
* @param {id} - User ID 
* @return {Promise<IUserResponse>} 
*/  
userRouter.put('/users/:id', (request: Request, response: Response)=>{
     response.json({ 
        
     })
});

/**
* Gets user's orders
* @param {id} - User ID 
* @return {Promise<IUserResponse>} 
*/  
userRouter.get('/users/:userId/orders', (request: Request, response: Response)=>{
     response.json({ 
        
     })
});

export default userRouter;