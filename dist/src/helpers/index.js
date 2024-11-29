"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });
exports.validator = validator;
