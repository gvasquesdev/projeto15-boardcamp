import express from "express"
import { getRentals, postRental, returnRental, deleteRental } from "../controllers/rentalsController.js"
import { postRentalMiddleware, returnRentalMiddleware, deleteRentalMiddleware } from "../middlewares/rentalsMiddleware.js"

const rentalsRouter = express.Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", postRentalMiddleware, postRental)
rentalsRouter.post("/rentals/:id/return", returnRentalMiddleware, returnRental)
rentalsRouter.delete("/rentals/:id", deleteRentalMiddleware , deleteRental)

export default rentalsRouter