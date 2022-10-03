import db from "../database/db.js";

export async function getGames (req, res) {
    const name = req.query.name;


    if (name) {
        const { rows: gamesByName } = await db.query(
            `SELECT g.*, c.name as "categoryName" 
            FROM games g 
            JOIN categories c 
            ON g."categoryId" = c.id 
            WHERE LOWER(g.name) 
            LIKE LOWER('%'||$1||'%')
            `,
            [name]
        );
        return res.send(gamesByName);
    } 

    const { rows: games } = await db.query(
        `SELECT g.*, c.name as "categoryName" 
        FROM games g 
        JOIN categories c 
        ON g."categoryId" = c.id`
    )

    res.send(games);
}

export async function postGame (req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    await db.query(
        `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
        VALUES ($1, $2, $3, $4, $5)`,
        [name, image, stockTotal, categoryId, pricePerDay]
    );
    
    res.sendStatus(201);
}