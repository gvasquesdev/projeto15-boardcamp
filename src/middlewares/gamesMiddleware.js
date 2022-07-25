import db from "../database/database.js";
import { postGameSchema } from "../schemas/gamesSchema.js";

export async function postGameMiddleware (req, res, next) {
    const { name, categoryId } = req.body;

    const validation = postGameSchema.validate(req.body)
    const { rows: categoryExists } = await db.query(
        'SELECT * FROM categories WHERE id = $1',
        [categoryId]
    )
    if (validation.error || !categoryExists.length) {
        return res.sendStatus(400);
    }

    const { rows: gameNameAlreadyExists } = await db.query(
        'SELECT * FROM games WHERE LOWER(name) = LOWER($1)',
        [name]
    );

    if (gameNameAlreadyExists.length) {
        return res.sendStatus(409);
    }

    next();
}