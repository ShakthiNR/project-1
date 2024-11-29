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
exports.handleErrorValidation = void 0;
const helpers_1 = require("@/helpers");
const logger_1 = __importDefault(require("@/infrastructure/logger"));
const handleErrorValidation = (schema, hasToValidatePayload = true) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        logger_1.default.info("errorValidation | called");
        try {
            const { error } = hasToValidatePayload
                ? (0, helpers_1.validator)(schema)(req.body)
                : (0, helpers_1.validator)(schema)(req.params);
            if (error) {
                logger_1.default.info("errorValidation | failed");
                const msgs = error.details.map((e) => {
                    return { message: e.message, path: e.path };
                });
                return res.status(400).json({
                    status: 400,
                    errors: msgs,
                });
            }
            logger_1.default.info("errorValidation | succeeded");
            return next();
        }
        catch (error) {
            return res.status(400).json({ error: "Something went wrong" });
        }
    });
};
exports.handleErrorValidation = handleErrorValidation;
