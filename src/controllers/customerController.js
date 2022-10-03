import db from "../database/db.js";

export async function getCustomers (req, res) {
    const { cpf } = req.query;

    if (cpf) {
        const { rows: customersByCpf } = await db.query(
            `SELECT * FROM customers WHERE cpf LIKE '%'||$1||'%'`,
            [cpf]
        );
        return res.send(customersByCpf);
    } 

    const { rows: customers } = await db.query(
        'SELECT * FROM customers'
    );

    res.send(customers);
}

export async function getCustomerById (req, res) {
    const { id } = req.params;

    const { rows: customerById } = await db.query(
        'SELECT * FROM customers WHERE id = $1',
        [id]
    );

    res.send(customerById[0]);
}

export async function postCustomer (req, res) {
    const { name, phone, cpf, birthday } = req.body;

    await db.query(
        'INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)',
        [name, phone, cpf, birthday]
    );
    
    res.sendStatus(201);
}

export async function updateCustomer (req, res) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    await db.query(
        'UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5',
        [name, phone, cpf, birthday, id]
    );
    
    res.sendStatus(200);
}