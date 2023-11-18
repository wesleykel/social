import { Pool } from "pg";
export const pool = new Pool({
  host: process.env.HOST,
  user: process.env.PGUSER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});
