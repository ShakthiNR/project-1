import logger from "@/infrastructure/logger";
import { Response, Request, NextFunction } from "express";
import { prisma } from "../..";
import { IPrimaryVarients } from "@/types/products";
import { productServices } from "@/services";

/**
 * @description Products controller
 * @author Shakthi NR
 */
export const productController = {
  /**
   * @description Get product or products based on params
   * @returns the array of products with status code
   */
  getProducts: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info("productsController | getProduct called ");
      const { id } = req.params;
      const page = req.query?.page as string;
      const limit = req.query?.limit as string;

      const response = await productServices.getProducts(id, page, limit);
      logger.info("productsController | getProduct completed");
      res.status(200).json(response);
    } catch (error) {
      logger.error("productsController | getProduct failed ");
      logger.info(error);
      return next(error);
    }
  },

  /**
   *
   * @description Create a product
   * @returns the created product id with status code
   */
  createProduct: async (req: Request, res: Response, next:NextFunction): Promise<void> => {
    try {
      logger.info("productsController | createProduct | called");
      const data = req.body;

      const response = await productServices.createProduct(data);
      logger.info("productsController | createProduct | completed");

      if (response) {
        res.status(200).json(response);
      }
      else next("Something went wrong");
    } catch (error) {
      logger.error("productsController | createProduct | failed ");
      logger.info(error);
      return next(error)
    }
  },

  /**
   *
   * @description Update a product
   * @returns  
   */
  updateProduct: async (req: Request, res: Response, next:NextFunction): Promise<void> => { 
    try {
      logger.info("productsController | updateProduct | called");
      const { id } = req.params;
      const data = req.body;
      const response = await productServices.updateProduct(id, data);
      logger.info("productsController | updateProduct | completed");
      if (response) {
         res.status(200).json({ message: "Product updated successfully", status: 200 }); 
      }
      else next("Something went wrong");
    } catch(err) {
      logger.error("productsController | updateProduct | failed ");
      logger.info(err);
      return next(err)
    }
   }
};
