import express, { Application } from "express";
import appRouter from "./app-route";

const PORT: number = 3000;
const app: Application = express();

app.use(express.json());
app.use("/", appRouter);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    statusCode: status,
    message: message,
  });
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING - http://localhost:3000/`)
})