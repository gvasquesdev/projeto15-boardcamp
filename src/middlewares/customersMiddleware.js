import connection from "../database/database.js"
import { generalCustomerSchema } from "../schemas/customerSchema.js"

export async function getCustomerByIdMiddleware (req, res, next) {
    const { id } = req.params;

    if (!/^[1-9][0-9]*$/.test(id)) {
        return res.sendStatus(400);
    }

    const { rows: customerExists } = await connection.query(
        'SELECT * FROM customers WHERE id = $1',
        [id]
    );

    if (!customerExists.length) {
        return res.sendStatus(404);
    }

    next();
}

export async function postCustomerMiddleware (req, res, next) {
    const { cpf } = req.body

    const validation = generalCustomerSchema.validate(req.body)
    if (validation.error) {
        console.log(validation.error.details)
        return res.sendStatus(400)
    }

    const { rows: cpfAlreadyExists } = await connection.query(
        'SELECT * FROM customers WHERE cpf = $1',
        [cpf]
    )
    if (cpfAlreadyExists.length) {
        return res.sendStatus(409)
    }

    next()
}

export async function updateCustomerMiddleware (req, res, next) {
    const { id } = req.params
    const { cpf } = req.body;

    const validation = generalCustomerSchema.validate(req.body)
    if (validation.error) {
        return res.sendStatus(400)
    }

    const { rows: cpfAlreadyExists } = await connection.query(
        'SELECT * FROM customers WHERE (cpf = $1 AND id <> $2)',
        [cpf, id]
    )
    if (cpfAlreadyExists.length) {
        return res.sendStatus(409)
    }

    next()
}