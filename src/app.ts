import express, { Application } from 'express';
import appRouter from './app-route';
import { Server } from 'socket.io';
import { dbConnection } from './db/config/mongodb';
import swaggerUI from 'swagger-ui-express';
import swaggerDocumentation from './swagger.json' assert { type: 'json' };

const PORT: number = 3000;
const app: Application = express();
const io = new Server(3001);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
app.use(express.json());
app.use('/', appRouter);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    statusCode: status,
    message: message,
  });
});

//DB CONNECTION
dbConnection();
//END - DB CONNECTION

//SOCKET
io.on('connection', (socket) => {
  console.log('connection', socket.id);

  socket.on('disconnect', () => {
    console.log('disconnect', socket.id);
  });
});

//END - SOCKET

app.listen(PORT, () => {
  console.log('SERVER RUNNING - http://localhost:3000/');
});
