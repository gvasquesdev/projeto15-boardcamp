import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const dbconnection = {
    connectionString: process.env.DATABASE_URL
};

if (dbconnection) {
    console.log("É isso aí");
}


const db = new Pool(dbconnection);
export default db;