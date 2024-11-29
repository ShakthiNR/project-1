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
exports.productController = void 0;
const logger_1 = __importDefault(require("@/infrastructure/logger"));
const services_1 = require("@/services");
/**
 * @description Products controller
 * @author Shakthi NR
 */
exports.productController = {
    /**
     * @description Get product or products based on params
     * @returns the array of products with status code
     */
    getProducts: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            logger_1.default.info("productsController | getProduct called ");
            const { id } = req.params;
            const page = (_a = req.query) === null || _a === void 0 ? void 0 : _a.page;
            const limit = (_b = req.query) === null || _b === void 0 ? void 0 : _b.limit;
            const response = yield services_1.productServices.getProducts(id, page, limit);
            logger_1.default.info("productsController | getProduct completed");
            res.status(200).json(response);
        }
        catch (error) {
            logger_1.default.error("productsController | getProduct failed ");
            logger_1.default.info(error);
            return next(error);
        }
    }),
    /**
     *
     * @description Create a product
     * @returns the created product id with status code
     */
    createProduct: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            logger_1.default.info("productsController | createProduct | called");
            const data = req.body;
            const response = yield services_1.productServices.createProduct(data);
            logger_1.default.info("productsController | createProduct | completed");
            if (response) {
                res.status(200).json(response);
            }
            else
                next("Something went wrong");
        }
        catch (error) {
            logger_1.default.error("productsController | createProduct | failed ");
            logger_1.default.info(error);
            return next(error);
        }
    }),
    /**
     *
     * @description Update a product
     * @returns
     */
    updateProduct: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            logger_1.default.info("productsController | updateProduct | called");
            const { id } = req.params;
            const data = req.body;
            const response = yield services_1.productServices.updateProduct(id, data);
            logger_1.default.info("productsController | updateProduct | completed");
            if (response) {
                res.status(200).json({ message: "Product updated successfully", status: 200 });
            }
            else
                next("Something went wrong");
        }
        catch (err) {
            logger_1.default.error("productsController | updateProduct | failed ");
            logger_1.default.info(err);
            return next(err);
        }
    })
};
