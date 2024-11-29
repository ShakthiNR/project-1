"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const logger_1 = __importDefault(require("@/infrastructure/logger"));
const __1 = require("..");
const errorHandling_1 = require("@/middlewares/errorHandling");
const mongodb_1 = require("mongodb");
/**
 * @description Products services
 * @author Shakthi NR
 */
exports.productServices = {
    /**
     * @description Get product or products based on params
     * @returns the array of products with status code
     */
    getProducts: (id, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
        logger_1.default.info("productServices | getProduct called ");
        //! Get product by id
        if (id) {
            const isValidId = mongodb_1.ObjectId.isValid(id);
            if (!isValidId)
                throw new errorHandling_1.CustomError("Invalid product id", 400);
            const product = yield __1.prisma.products.findUnique({
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
                throw new errorHandling_1.CustomError("Product not found", 400);
            }
            return { data: [product], status: 200 };
        }
        //! Get all products
        const _page = parseInt(page) || 1;
        const _limit = parseInt(limit) || 10;
        const products = yield __1.prisma.products.findMany({
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
        const total = yield __1.prisma.products.count();
        return {
            status: 200,
            data: products,
            count: total,
            page: _page,
            limit: _limit,
            totalPages: Math.ceil(total / _limit),
        };
    }),
    /**
     *
     * @description Create a product
     * @returns the created product id with status code
     */
    createProduct: (data) => __awaiter(void 0, void 0, void 0, function* () {
        logger_1.default.info("productServices | createProduct | called");
        const { title, price, discountPercentage = 0, inventory, active, leadTime, description, category, image, primaryVariantName, secondaryVariantName, primaryVariants, } = data;
        const date = new Date();
        let productId = yield __1.prisma.products.create({
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
        primaryVariants === null || primaryVariants === void 0 ? void 0 : primaryVariants.forEach((primaryVarient) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, price, discountPercentage, inventory, active, secondaryVariants, } = primaryVarient;
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
            const _primaryVarient = yield __1.prisma.primaryVariants.create({
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
            secondaryVariants === null || secondaryVariants === void 0 ? void 0 : secondaryVariants.forEach((secondaryVarient) => __awaiter(void 0, void 0, void 0, function* () {
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
                yield __1.prisma.secondaryVariants.create({
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
            }));
        }));
        logger_1.default.info("productsController | createProduct | completed");
        return {
            status: 200,
            message: "Product created successfully",
            productId: productId.id,
        };
    }),
    updateProduct: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        logger_1.default.info("productServices | updateProduct | called");
        const product = yield __1.prisma.products.findUnique({
            where: { id },
        });
        if (!product) {
            throw new errorHandling_1.CustomError("Product not found", 400);
        }
        const { title, price, discountPercentage, inventory, active, leadTime, description, category, image, primaryVariantName, secondaryVariantName, } = data;
        const date = new Date();
        yield __1.prisma.products.update({
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
        return true;
    })
};
