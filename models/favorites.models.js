const queries = require('../queries/favorites.queries')
const pool = require('../config/db_pgsql');

// CREATE
const createFavorite = async (favorite) => {
    const { email, job_id } = favorite;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createFavorite, [email, job_id]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// Pruebas PostgreSQL
// let newFavorite = {
//     email: 'diego@gmail.com',
//     job_id: "2"
// }
// createFavorite(newFavorite)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// READ
const readFavorites = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.readFavorites, [email]);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// Pruebas PostgreSQL
// readFavorites('diego@gmail.com')
//     .then(data=>console.log(data))
//     .catch(error => console.log(error))

// DELETE
const deleteFavorite = async (email, job_id) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteFavorite, [email, job_id])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// Pruebas PostgreSQL
// deleteFavorite('diego@gmail.com', '2')
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

const favorites = {
    createFavorite,
    readFavorites,
    deleteFavorite
}

module.exports = favorites;