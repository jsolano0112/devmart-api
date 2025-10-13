import express, { Application } from 'express';
import appRouter from './app-route';
import { Server } from 'socket.io';
import { dbConnection } from './shared/infraestructure/db/mongodb.config';
import swaggerUI from 'swagger-ui-express';
// @ts-ignore
import swaggerDocumentation from './swagger.json';
import { errorHandler } from './shared/helpers/error-handler';
import { setupSwagger } from './swagger';

const PORT: number = 3000;
const app: Application = express();
const io = new Server(3001);

// SWAGGER
setupSwagger(app);
// END - SWAGGER

app.use(express.json());
app.use('/', appRouter);
app.use(errorHandler);

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
  console.log('SERVER RUNNING - http://localhost:3000/api/v1/');
  console.log('SWAGGER - http://localhost:3000/swagger');
});
