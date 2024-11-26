import  { createLogger, format, transports } from 'winston';

const { combine, label, printf, timestamp } = format;

const myFormat = printf(({ level, message, label, timestamp }) => { return `${timestamp} [${label}] ${level}: ${message}`; });
const consoleLogFormat = format.combine(format.colorize(), myFormat)

const logger = createLogger({
    level: 'info',
    format: combine(label({ label: "ANDISOR-API"}), timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), myFormat),
    transports: [
        new transports.Console({ format: consoleLogFormat }),
        new transports.File({
            filename: './logs/info.log',
            level: "info",
            format: combine(label({ label: "ANDISOR-API"}), timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), myFormat)
        }),
        new transports.File({
            filename: './logs/error.log',
            level: "error",
            format: format.combine( label({ label: "ANDISOR-API"}), timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), myFormat)

        }),
        new transports.File({
            filename: './logs/combined.log',
            format: format.combine(format.timestamp(), myFormat)
        }),

    ]
})

export { logger as default }