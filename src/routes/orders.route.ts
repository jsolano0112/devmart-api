import express, {Router, Request, Response} from 'express'
import { orders } from '../constants/mock/orders.constants';

const orderRouter: Router = express.Router();

/**
* Gets order by ID
* @param {id} - User ID 
* @return {Promise<>} 
*/  
orderRouter.get('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  const user = orders.find(u => u.id === parseInt(id));

  if (!user) {
    return response.status(404).json({
      ok: false,
      message: 'Order not found'
    });
  }

  response.json({
    ok: true,
    data: user
  });
});


//TODO THE REST
/**
* Creates order
* @param {id} - User ID 
* @return {Promise<>} 
*/  
orderRouter.post('/orders', (request: Request, response: Response)=>{
     response.json({ 
       response 
     })
});


/**
* Updates order
* @param {id} - User ID 
* @return {Promise<>} 
*/  
orderRouter.put('/orders/:id', (request: Request, response: Response)=>{
     response.json({ 
        
     })
});

/**
* Deletes order
* @param {id} - User ID 
* @return {Promise<>} 
*/  
orderRouter.delete('/orders/:id', (request: Request, response: Response)=>{
     response.json({ 
        
     })
});

export default orderRouter;