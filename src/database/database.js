import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const dbconnection = {
    connectionString: process.env.DATABASE_URL
};

const db = new Pool(dbconnection);
export default db;