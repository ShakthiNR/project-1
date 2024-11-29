import { Router } from "express";
import productRoutes from "./products";

const rootRouter:Router = Router();

rootRouter.use("/v1", productRoutes)

export default rootRouter;