"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.DB_PORT = exports.DB_HOST = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USER = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Export environment variables
exports.DB_USER = process.env.DB_USER || "";
exports.DB_PASSWORD = process.env.DB_PASSWORD || "";
exports.DB_NAME = process.env.DB_NAME || "";
exports.DB_HOST = process.env.DB_HOST || "";
exports.DB_PORT = parseInt(process.env.DB_PORT || "5432", 10);
exports.port = process.env.PORT || 3000;
