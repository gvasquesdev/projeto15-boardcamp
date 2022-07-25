import joi from "joi";
import joiDate from "@joi/date";

const joidate = joi.extend(joiDate);

const generalCustomerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern(new RegExp("^[0-9]{10,11}$")).required(),
    cpf: joi.string().pattern(new RegExp("^[0-9]{11}$")).required(),
    birthday: joidate.date().format('YYYY-MM-DD').required()
});

export { generalCustomerSchema };