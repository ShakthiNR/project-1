import  {Router} from "express";
import { productController } from "@/controllers";
import { handleErrorValidation } from "@/middlewares/errorValidation";
import { productSchema } from "@/schema";

const productRoutes = Router();

productRoutes.get('/products/:id?', productController.getProducts)
productRoutes.post('/products', handleErrorValidation(productSchema), productController.createProduct)
productRoutes.put('/products/:id', handleErrorValidation(productSchema), productController.updateProduct)
export default productRoutes;