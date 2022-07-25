import joi from "joi";

const postRentalSchema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    daysRented: joi.number().min(0).required()
});

export { postRentalSchema };