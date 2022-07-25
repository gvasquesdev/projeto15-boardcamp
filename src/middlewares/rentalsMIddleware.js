import db from "../database/database"
import { postRentalSchema } from "../schemas/rentalsSchema.js"

export async function postRentalMiddleware (req, res, next) {
    const { customerId, gameId } = req.body;

    const validation = postRentalSchema.validate(req.body);
    const { rows: customerExists } = await db.query(
        'SELECT * FROM customers WHERE id = $1',
        [customerId]
    );
    const { rows: selectedGame } = await db.query(
        'SELECT * FROM games WHERE id = $1',
        [gameId]
    );
    const { rows: ongoingRentals } = await db.query(
        'SELECT * FROM rentals WHERE ("gameId" = $1 AND "returnDate" IS NULL)',
        [gameId]
    );
    if (validation.error || !customerExists.length || !selectedGame.length || ongoingRentals.length >= selectedGame[0].stockTotal) {
        return res.sendStatus(400);
    }

    next();
}

export async function returnRentalMiddleware (req, res, next) {
    const { id } = req.params;

    const { rows: selectedRental } = await db.query(
        'SELECT * FROM rentals WHERE id = $1',
        [id]
    );
    if (!selectedRental.length) {
        return res.sendStatus(404);
    }

    if (selectedRental[0].returnDate) {
        return res.sendStatus(400);
    }

    next();
}

export async function deleteRentalMiddleware (req, res, next) {
    const { id } = req.params

    const { rows: selectedRental } = await db.query(
        'SELECT * FROM rentals WHERE id = $1',
        [id]
    );
    if (!selectedRental.length) {
        return res.sendStatus(404);
    }

    if (!selectedRental[0].returnDate) {
        return res.sendStatus(400);
    }


    next();
}