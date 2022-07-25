import express from "express";
import { postCategories, getCategories } from "../controllers/categoriesController.js";
import { categoryMiddleware } from "../middlewares/categoriesMiddleware.js";

const categoriesRouter = express.Router();

categoriesRouter.post("/categories", categoryMiddleware, postCategories);
categoriesRouter.get("/categories", getCategories);

export default categoriesRouter;