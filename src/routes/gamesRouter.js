import express from "express";
import { getGames, postGame } from "../controllers//gamesController.js";
import { postGameMiddleware } from "../middlewares/gamesMiddleware.js";

const gamesRouter = express.Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", postGameMiddleware, postGame);

export default gamesRouter;