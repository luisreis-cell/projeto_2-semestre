const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',        // ou o host onde seu banco está rodando
  user: 'app_user',         // usuário criado no seu script SQL
  password: 'S3nh@Aplicacao', // senha criada no seu script SQL
  database: 'SistemaEscolar'  // nome do banco criado
});

module.exports = pool;
