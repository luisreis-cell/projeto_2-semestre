// db.js
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',         
    password: '',         // Se você não configurou senha no XAMPP, deixe vazio
    database: 'projeto',  // O nome do seu banco de dados
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function query(sql, params) {
    const [results] = await connection.execute(sql, params);
    return results;
}

module.exports = {
    query
};