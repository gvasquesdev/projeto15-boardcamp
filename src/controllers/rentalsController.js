import db from "../database/db.js";
import dayjs from "dayjs";

export async function getRentals (req, res) {
    const customerId = parseInt(req.query.customerId);
    const gameId = parseInt(req.query.gameId);

    if (customerId && gameId) {
        var { rows: rentals } = await db.query(
            `SELECT r.*, cu.name as "customerName", 
            g.name as "gameName", g."categoryId", ca.name as "categoryName"
            FROM rentals r 
            JOIN customers cu 
            ON r."customerId" = cu.id 
            JOIN games g 
            ON r."gameId" = g.id 
            JOIN categories ca 
            ON g."categoryId" = ca.id  
            WHERE (r."customerId" = $1 AND r."gameId" = $2)`,
            [customerId, gameId]
        );

    } else if (customerId && !gameId) {
        var { rows: rentals } = await db.query(
            `SELECT r.*, cu.name as "customerName", 
            g.name as "gameName", g."categoryId", ca.name as "categoryName"
            FROM rentals r 
            JOIN customers cu 
            ON r."customerId" = cu.id 
            JOIN games g 
            ON r."gameId" = g.id 
            JOIN categories ca 
            ON g."categoryId" = ca.id  
            WHERE r."customerId" = $1`,
            [customerId]
        );

    } else if (!customerId && gameId) {
        var { rows: rentals } = await db.query(
            `SELECT r.*, cu.name as "customerName", 
            g.name as "gameName", g."categoryId", ca.name as "categoryName"
            FROM rentals r 
            JOIN customers cu 
            ON r."customerId" = cu.id 
            JOIN games g 
            ON r."gameId" = g.id 
            JOIN categories ca 
            ON g."categoryId" = ca.id  
            WHERE r."gameId" = $1`,
            [gameId]
        );

    } else {
        var { rows: rentals } = await db.query(
            `SELECT r.*, cu.name as "customerName", 
            g.name as "gameName", g."categoryId", ca.name as "categoryName"
            FROM rentals r 
            JOIN customers cu 
            ON r."customerId" = cu.id 
            JOIN games g 
            ON r."gameId" = g.id 
            JOIN categories ca 
            ON g."categoryId" = ca.id`
        );

    }

    const formattedRentals = rentals.map( value => {
        const { id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice,delayFee, customerName, gameName, categoryId, categoryName } = value;
        return {
            id,
            customerId,
            gameId,
            rentDate,
            daysRented,
            returnDate,
            originalPrice,
            delayFee,
            customer: {
                id: customerId,
                name: customerName
            },
            game: {
                id: gameId,
                name: gameName,
                categoryId,
                categoryName
            }

        }
    });

    res.send(formattedRentals);
}

export async function postRental (req, res) {
    const { customerId, gameId, daysRented } = req.body;

    const { rows: selectedGame } = await db.query(
        'SELECT * FROM games WHERE id = $1',
        [gameId]
    );
    
    const rentDate = dayjs(Date.now()).format("YYYY-MM-DD")
    const originalPrice = selectedGame[0].pricePerDay * daysRented
    

    await db.query(
        `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
    )
    
    res.sendStatus(201);
}

export async function returnRental (req, res) {
    const { id } = req.params

    const { rows: selectedRental } = await db.query(
        `SELECT r.*, g."pricePerDay" 
        FROM rentals r 
        JOIN games g 
        ON r."gameId" = g.id 
        WHERE r.id = $1`,
        [id]
    );

    const returnDate = dayjs(Date.now()).format("YYYY-MM-DD")
    const rentDate = dayjs(selectedRental[0].rentDate).format("YYYY-MM-DD")
    const delayFee = selectedRental[0].pricePerDay * (dayjs(returnDate).diff(rentDate, 'day') - selectedRental[0].daysRented)

    await db.query(
        'UPDATE rentals SET "returnDate" = $1, "delayFee" = $2  WHERE id = $3',
        [returnDate, delayFee, id]
    );
    
    res.sendStatus(200)
}

export async function deleteRental (req, res) {
    const { id } = req.params;

    await db.query(
        'DELETE FROM rentals WHERE id = $1',
        [id]
    );
    res.sendStatus(200);
}