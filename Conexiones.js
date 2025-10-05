const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'centerbeam.proxy.rlwy.net',
  port: 25857, 
  user: 'root',
  password: 'hgTPLDmAIYBqqegrfSiSVZNSHJmHtvok',
  database: 'railway',
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0
});

async function getConnection() {
  return pool.getConnection();
}

module.exports = { getConnection };
