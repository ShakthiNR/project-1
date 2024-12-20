import express, { Request } from "express";
import { PORT } from "@/secrets";
import rootRouter from "@/routes";
import { PrismaClient } from "@prisma/client";
import logger from "@/infrastructure/logger";
import { errorHandler } from "@/middlewares/errorHandling";

const app = express();
const cors = require('cors')

app.use(cors());
app.get("/", (req:Request, res:any)=> {
  return res.status(200).json({message: "Welcome to the API"})
})
app.use("/api", rootRouter);

export const prisma = new PrismaClient({
  //! enable it if wanted
  //   log: ["query"],
});

app.use(errorHandler)

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export default app;
