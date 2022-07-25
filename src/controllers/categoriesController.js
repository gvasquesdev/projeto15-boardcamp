import db from "../database/database.js";

export async function postCategories (req, res) {

    const category = req.body;

    try {
        const result = await db.query(
            `INSERT INTO categories (name) 
                VALUES ($1)`, [category.name]);
        res.sendStatus(201);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}

export async function getCategories (req,res) {
    
    const { rows: categories } = await db.query(
        'SELECT * FROM categories'
    );

    res.send(categories);
}

