import pkg from "pg"
import dotenv from "dotenv"
dotenv.config()

const { Pool } = pkg;

const dbconnection = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default dbconnection;