const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',  
  user: 'app_user',  
  password: 'S3nh@Aplicacao',
  database: 'SistemaEscolar'  
});

module.exports = pool;

