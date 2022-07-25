import joi from "joi";

const postGameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string(),
    stockTotal: joi.number().min(0).required(),
    categoryId: joi.number().min(0).required(),
    pricePerDay: joi.number().min(0).required()
})

export { postGameSchema };