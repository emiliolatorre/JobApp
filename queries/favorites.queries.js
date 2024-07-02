const queries = {
    createFavorite: `INSERT INTO favorites(user_id, job_id)
    VALUES((SELECT user_id FROM users WHERE email = $1), $2);`,
    readFavorites: `SELECT job_id
    FROM favorites
    WHERE user_id = (SELECT user_id FROM users WHERE email = $1)`,
    deleteFavorite: `DELETE FROM favorites
    WHERE user_id = (SELECT user_id FROM users WHERE email = $1)
    AND job_id = $2;`
}
module.exports = queries;