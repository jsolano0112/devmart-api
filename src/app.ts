import express, { Application } from "express";
import appRouter from "./app-route";

const PORT: number = 4001;
const app: Application = express();
app.use(express.json());
app.use("/", appRouter);
app.listen(PORT, () => {
  console.log(`SERVER RUNNING - http://localhost:4001/`)
})