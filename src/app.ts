import express, { Application } from 'express';
import appRouter from './app-route';
import { Server } from 'socket.io';

const PORT: number = 3000;
const app: Application = express();
const io = new Server(3001);

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
