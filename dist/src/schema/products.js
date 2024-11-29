"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const secondaryVariantSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    discountPercentage: joi_1.default.number().optional().min(0).max(100),
    inventory: joi_1.default.number().required(),
});
const primaryVariantSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    discountPercentage: joi_1.default.number().optional().min(0).max(100),
    inventory: joi_1.default.number().required(),
    active: joi_1.default.boolean().required(),
    secondaryVariants: joi_1.default.array().items(secondaryVariantSchema).optional(),
});
exports.productSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    discountPercentage: joi_1.default.number().optional().min(0).max(100),
    inventory: joi_1.default.string().required(),
    active: joi_1.default.boolean().required(),
    leadTime: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    image: joi_1.default.string().uri().required(),
    primaryVariantName: joi_1.default.string().required(),
    secondaryVariantName: joi_1.default.string().required(),
    primaryVariants: joi_1.default.array().items(primaryVariantSchema).optional(),
});
