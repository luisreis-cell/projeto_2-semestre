// src/config/db.js

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',  
  user: 'app_user',  
  password: 'S3nh@Aplicacao',
  database: 'SistemaEscolar',  
  port: 3307 // ✅ Corrigido para a nova porta do MySQL
});

module.exports = pool;