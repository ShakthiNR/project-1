"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const secrets_1 = require("@/secrets");
const routes_1 = __importDefault(require("@/routes"));
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("@/infrastructure/logger"));
const errorHandling_1 = require("@/middlewares/errorHandling");
const app = (0, express_1.default)();
const cors = require('cors');
app.use(cors());
app.get("/", () => {
    console.log("Hello World");
});
app.use("/api", routes_1.default);
exports.prisma = new client_1.PrismaClient({
//! enable it if wanted
//   log: ["query"],
});
app.use(errorHandling_1.errorHandler);
app.listen(secrets_1.PORT, () => {
    logger_1.default.info(`Server is running on port ${secrets_1.PORT}`);
});
