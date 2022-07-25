import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/index.js"


dotenv.config()
const app = express();

app.use(cors(), express.json(), router);

const port = process.env.PORT || 4000;
app.listen(process.env.PORT, () => {
    console.log("Server running on port " + port);
});