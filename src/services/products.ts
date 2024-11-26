import logger from "@/infrastructure/logger";
import { Response, Request } from "express";
import { prisma } from "..";
import { IPrimaryVarients, IProduct } from "@/types/products";
import { CustomError } from "@/middlewares/errorHandling";
import { ObjectId } from "mongodb";
/**
 * @description Products services
 * @author Shakthi NR
 */
export const productServices = {
  /**
   * @description Get product or products based on params
   * @returns the array of products with status code
   */
  getProducts: async (
    id: string,
    page?: string,
    limit?: string
  ): Promise<any> => {
    logger.info("productServices | getProduct called ");

    //! Get product by id
    if (id) {
      const isValidId = ObjectId.isValid(id);
      if (!isValidId) throw new CustomError("Invalid product id", 400);
      const product = await prisma.products.findUnique({
        where: { id },
        include: {
          primaryVariants: {
            include: {
              secondaryVariants: true,
            },
          },
        },
      });

      if (!product) {
        throw new CustomError("Product not found", 400);
      }
      return { data: [product], status: 200 };
    }

    //! Get all products
    const _page = parseInt(page as string) || 1;
    const _limit = parseInt(limit as string) || 10;

    const products = await prisma.products.findMany({
      skip: (_page - 1) * _limit,
      take: _limit,
      include: {
        primaryVariants: {
          include: {
            secondaryVariants: true,
          },
        },
      },
    });

    const total = await prisma.products.count();
    return {
      status: 200,
      data: products,
      count: total,
      page: _page,
      limit: _limit,
      totalPages: Math.ceil(total / _limit),
    };
  },

  /**
   *
   * @description Create a product
   * @returns the created product id with status code
   */
  createProduct: async (data: IProduct): Promise<any> => {
    logger.info("productServices | createProduct | called");
    const {
      title,
      price,
      discountPercentage = 0,
      inventory,
      active,
      leadTime,
      description,
      category,
      image,
      primaryVariantName,
      secondaryVariantName,
      primaryVariants,
    } = data;
    const date = new Date();
    let productId = await prisma.products.create({
      data: {
        title,
        price,
        discountPercentage,
        inventory,
        active,
        leadTime,
        description,
        category,
        image,
        primaryVariantName,
        secondaryVariantName,
        createdAt: date,
        updatedAt: date,
      },
    });

    primaryVariants?.forEach(async (primaryVarient: IPrimaryVarients) => {
      const {
        name,
        price,
        discountPercentage,
        inventory,
        active,
        secondaryVariants,
      } = primaryVarient;

      // const findPrimaryVariant = await prisma.primaryVariants.findFirst({
      //   where: {
      //     name,
      //     price,
      //     discountPercentage,
      //     inventory,
      //     active,
      //   },
      // });

      // // skip if it is duplicated
      // if (findPrimaryVariant) return;

      const _primaryVarient = await prisma.primaryVariants.create({
        data: {
          name,
          price,
          discountPercentage: discountPercentage || 0,
          inventory,
          active,
          createdAt: date,
          updatedAt: date,
          productId: productId.id,
        },
      });

      secondaryVariants?.forEach(async (secondaryVarient: any) => {
        const { name, price, discountPercentage, inventory } = secondaryVarient;

        // const findSecondaryVariant = await prisma.secondaryVariants.findFirst({
        //   where: {
        //     name,
        //     price,
        //     discountPercentage,
        //     inventory,
        //   },
        // });

        // // skip if it is duplicated
        // if (findSecondaryVariant) return;
          await prisma.secondaryVariants.create({
            data: {
              name,
              price,
              discountPercentage,
              inventory,
              createdAt: date,
              updatedAt: date,
              primaryVariantId: _primaryVarient.id,
            },
          });
      });
    });

    logger.info("productsController | createProduct | completed");

    return {
      status: 200,
      message: "Product created successfully",
      productId: productId.id,
    }
  },

  updateProduct:async (id: string, data: Partial<IProduct>): Promise<any> => {
    logger.info("productServices | updateProduct | called");
    const product = await prisma.products.findUnique({
      where: { id },
    });

    if (!product) {
      throw new CustomError("Product not found", 400);
    }

    const {
      title,
      price,
      discountPercentage,
      inventory,
      active,
      leadTime,
      description,
      category,
      image,
      primaryVariantName,
      secondaryVariantName,
    } = data;

    const date = new Date();
    await prisma.products.update({
      where: { id },
      data: {
        title: title || product.title,
        price: price || product.price,
        discountPercentage: discountPercentage || product.discountPercentage,
        inventory: inventory || product.inventory,
        active: active || product.active,
        leadTime: leadTime || product.leadTime,
        description: description || product.description,
        category: category || product.category,
        image: image || product.image,
        primaryVariantName: primaryVariantName || product.primaryVariantName,
        secondaryVariantName: secondaryVariantName || product.secondaryVariantName,
        updatedAt: date,
      },
    });

    return true
  }
  
};
