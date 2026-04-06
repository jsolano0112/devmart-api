import express, { Application } from 'express';
import appRouter from './app-route';
import { dbConnection } from './shared/infraestructure/db/mongodb.config';
import { errorHandler } from './shared/helpers/error-handler';
import { setupSwagger } from './swagger';
import cors from "cors";

const PORT: number = 3000;
const app: Application = express();

// SWAGGER
setupSwagger(app);
// END - SWAGGER

app.use(cors({
  origin: "http://localhost:5173", //Front
   credentials: false
}));

app.use(express.json());
app.use('/', appRouter);
app.use(errorHandler);

//DB CONNECTION
dbConnection();
//END - DB CONNECTION


//SCHEDULER
// const scheduler = new Scheduler();
// scheduler.start();
//END - SCHEDULER




app.listen(PORT, () => {
  console.log('SERVER RUNNING - http://localhost:3000/api/v1/');
  console.log('SWAGGER - http://localhost:3000/swagger');
});
