const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
  const sqlPath = path.join(__dirname, '..', 'Rauls.session.sql');
  let sql = fs.readFileSync(sqlPath, 'utf8');

  // Gerar hashes bcrypt para os 3 usuários de exemplo
  const hash1 = await bcrypt.hash('admin123', 10);
  const hash2 = await bcrypt.hash('prof123', 10);
  const hash3 = await bcrypt.hash('aluno123', 10);

  // Substituir placeholders sequencialmente
  sql = sql.replace('<bcrypt_hash_here>', hash1);
  sql = sql.replace('<bcrypt_hash_here>', hash2);
  sql = sql.replace('<bcrypt_hash_here>', hash3);

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'odair0106',
    multipleStatements: true
  });

  try {
    console.log('Executando seed SQL...');
    await conn.query(sql);
    console.log('Seed executada com sucesso.');
  } catch (err) {
    console.error('Erro ao executar seed:', err.message);
  } finally {
    await conn.end();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
