const queries = {
    createUser: `INSERT INTO users(name, email, password, role)
    VALUES ($1, $2, $3, $4);`,
    readUsers: `SELECT * 
    FROM users
    WHERE role = 'user';`,
    readUsersByEmail: `SELECT name, email, password, role
    FROM users
    WHERE email = $1`,
    updateUserName: `UPDATE users
    SET name = $1
    WHERE email = $2;`,
    updateUserEmail: `UPDATE users
    SET email = $1
    WHERE email = $2;`,
    updateUserPassword: `UPDATE users
    SET password = $1
    WHERE email = $2;`,
    updateUserRole: `UPDATE users
    SET role = $1
    WHERE email = $2;`,
    updateUserLogged: `UPDATE users
    SET logged = $1
    WHERE email = $2;`,
    updateUserLastLoggedDate: `UPDATE users
    SET last_logged_date = $1
    WHERE email = $2;`,
    deleteUser: `DELETE FROM users
    WHERE email = $1`
}
module.exports = queries;