import db from "../database/database.js";
import { categorySchema } from "../schemas/categorySchema.js";


export async function categoryMiddleware (req,res,next) {
    const { name } = req.body;

    const validation = categorySchema.validate(req.body);
    if (validation.error) {
        return res.send("Erro ao cadastrar categoria").status(400);
    }

    const { rows: categoryExist } = await db.query(
        'SELECT * FROM categories WHERE name=$1', [name]
    );

    if (categoryExist.length) {
        return res.send("Essa categoria já existe").status(409);
    }

    next()
}