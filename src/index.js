"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var express_1 = require("express");
var secrets_1 = require("@/secrets");
var routes_1 = require("@/routes");
var client_1 = require("@prisma/client");
var logger_1 = require("@/infrastructure/logger");
var errorHandling_1 = require("@/middlewares/errorHandling");
var app = (0, express_1.default)();
var cors = require('cors');
app.use(cors());
app.get("/", function () {
    console.log("Hello World");
});
app.use("/api", routes_1.default);
exports.prisma = new client_1.PrismaClient({
//! enable it if wanted
//   log: ["query"],
});
app.use(errorHandling_1.errorHandler);
app.listen(secrets_1.PORT, function () {
    logger_1.default.info("Server is running on port ".concat(secrets_1.PORT));
});
