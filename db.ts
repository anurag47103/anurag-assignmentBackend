import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER as string,
  host: process.env.NODE_ENV === 'production' ? process.env.DB_HOST_PROD : process.env.DB_HOST_DEV,
  database: process.env.DB_NAME as string,
  password: process.env.DB_PASSWORD as string,
  port: process.env.NODE_ENV === 'production' ? parseInt(process.env.DB_PORT_PROD as string, 10) : parseInt(process.env.DB_PORT_DEV as string, 10),
});

export default pool;
