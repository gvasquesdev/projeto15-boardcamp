import express from "express";
import categoriesRouter from "./categoriesRouter.js";
import customersRouter from "./customerRouter.js";
import gamesRouter from "./gamesRouter.js";
import rentalsRouter from "./rentalsRouter.js";

const router = express.Router();

router.use(categoriesRouter);
router.use(gamesRouter);
router.use(customersRouter);
router.use(rentalsRouter);

export default router;