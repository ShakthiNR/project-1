"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const logger_1 = __importDefault(require("@/infrastructure/logger"));
const client_1 = require("@prisma/client");
const jsonData = __importStar(require("../../public/Dummy API.json"));
const prisma = new client_1.PrismaClient();
const Process = "Migrate data from json to db";
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Start ${Process}`);
        logger_1.default.info(`Data to be migrated: ${jsonData.length}`);
        let count = 0;
        for (let index = 0; index < jsonData.length; index++) {
            logger_1.default.info(`Migrating data ${++count} of ${jsonData.length}`);
            const { primary_variants, title, price, discountPercentage, inventory, active, leadTime, description, category, image, primary_variant_name, secondary_variant_name, } = jsonData[index];
            const date = new Date();
            let productId = yield prisma.products.create({
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
                    primaryVariantName: primary_variant_name,
                    secondaryVariantName: secondary_variant_name,
                    createdAt: date,
                    updatedAt: date,
                },
            });
            primary_variants === null || primary_variants === void 0 ? void 0 : primary_variants.forEach((primaryVarient) => __awaiter(void 0, void 0, void 0, function* () {
                const { name, price, discountPercentage, inventory, active, secondary_variants, } = primaryVarient;
                // const findPrimaryVariant = await prisma.primaryVariants.findFirst({
                //   where: {
                //     name,
                //     price,
                //     discountPercentage,
                //     inventory,
                //     active,
                //   },
                // });
                // if (findPrimaryVariant) return;
                const _primaryVarient = yield prisma.primaryVariants.create({
                    data: {
                        name,
                        price,
                        discountPercentage,
                        inventory,
                        active,
                        createdAt: date,
                        updatedAt: date,
                        productId: productId.id,
                    },
                });
                secondary_variants === null || secondary_variants === void 0 ? void 0 : secondary_variants.forEach((secondaryVarient) => __awaiter(void 0, void 0, void 0, function* () {
                    const { name, price, discountPercentage, inventory } = secondaryVarient;
                    // const findSecondaryVariant = await prisma.secondaryVariants.findFirst(
                    //   {
                    //     where: {
                    //       name,
                    //       price,
                    //       discountPercentage,
                    //       inventory,
                    //     },
                    //   }
                    // );
                    // if (findSecondaryVariant) return;
                    yield prisma.secondaryVariants.create({
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
            logger_1.default.info(`Migrating data ${count} is completed`);
        }
        logger_1.default.info(`End ${Process}`);
    }
    catch (err) {
        logger_1.default.info(`${Process} failed`);
        logger_1.default.error(err);
    }
});
run()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((err) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.error("Error in running script");
    logger_1.default.info(err);
    yield prisma.$disconnect();
    process.exit(1);
}));
