import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Export environment variables
export const DB_USER = process.env.DB_USER || "";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_NAME = process.env.DB_NAME || "";
export const DB_HOST = process.env.DB_HOST || "";
export const DB_PORT = parseInt(process.env.DB_PORT || "5432", 10);
export const port = process.env.PORT || 3000;
