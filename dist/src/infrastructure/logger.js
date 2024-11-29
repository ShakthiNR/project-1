"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const winston_1 = require("winston");
const { combine, label, printf, timestamp } = winston_1.format;
const myFormat = printf(({ level, message, label, timestamp }) => { return `${timestamp} [${label}] ${level}: ${message}`; });
const consoleLogFormat = winston_1.format.combine(winston_1.format.colorize(), myFormat);
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(label({ label: "ANDISOR-API" }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), myFormat),
    transports: [
        new winston_1.transports.Console({ format: consoleLogFormat }),
        new winston_1.transports.File({
            filename: './logs/info.log',
            level: "info",
            format: combine(label({ label: "ANDISOR-API" }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), myFormat)
        }),
        new winston_1.transports.File({
            filename: './logs/error.log',
            level: "error",
            format: winston_1.format.combine(label({ label: "ANDISOR-API" }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), myFormat)
        }),
        new winston_1.transports.File({
            filename: './logs/combined.log',
            format: winston_1.format.combine(winston_1.format.timestamp(), myFormat)
        }),
    ]
});
exports.default = logger;
