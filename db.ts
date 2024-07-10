import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.NODE_ENV === 'production' ? process.env.DB_HOST_PROD : process.env.DB_HOST_DEV,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
});

export default pool;
