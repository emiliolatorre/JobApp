const favorite = require('../models/favorites.models');
const { validationResult } = require("express-validator");

const createFavoriteController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newFavorite = req.body;
    if (
        "email" in newFavorite &&
        "job_id" in newFavorite
    ) {
        try {
            const response = await favorite.createFavorite(newFavorite);
            res.status(201).json({
                items_created: response
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
    }
}
// Prueba Postman
// POST https://jobapp-w73i.onrender.com/api/favorites
// {
//     "email": "diego@gmail.com",
//     "job_id": "2"
// }

const readFavoritesController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let favorites;
    try {
        favorites = await favorite.readFavorites(req.query.email);
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Prueba Postman
// GET https://jobapp-w73i.onrender.com

const deleteFavoriteController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let favorites;
    try {
        favorites = await favorite.deleteFavorite(req.query.email, req.query.job_id);
        res.status(200).json(favorites); // [] con las users encontradas
    } catch (error) {
        res.status(500).json({ error: 'Error en la BBDD' });
    }
}
// Prueba Postman
// DELETE https://jobapp-w73i.onrender.com&job_id=2

module.exports = {
    createFavoriteController,
    readFavoritesController,
    deleteFavoriteController
}