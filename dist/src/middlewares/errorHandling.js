"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    if (error instanceof CustomError) {
        return res
            .status(error.statusCode)
            .json({ status: error.statusCode, message: error.message });
    }
    else {
        return res
            .status(500)
            .json({ status: 500, message: "Internal server error" });
    }
};
exports.errorHandler = errorHandler;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
