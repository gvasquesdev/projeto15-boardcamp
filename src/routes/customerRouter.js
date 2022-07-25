import express from "express";
import { getCustomers, getCustomerById, postCustomer, updateCustomer } from "../controllers/customerController.js";
import { getCustomerByIdMiddleware, postCustomerMiddleware, updateCustomerMiddleware } from "../middlewares/customersMiddleware.js";

const customersRouter = express.Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerByIdMiddleware , getCustomerById);
customersRouter.post("/customers", postCustomerMiddleware, postCustomer);
customersRouter.put("/customers/:id", updateCustomerMiddleware, updateCustomer);

export default customersRouter;