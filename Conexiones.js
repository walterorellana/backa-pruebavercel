import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "centerbeam.proxy.rlwy.net",
  port: 25857,
  user: "root",
  password: "hgTPLDmAIYBqqegrfSiSVZNSHJmHtvok",
  database: "railway",
  waitForConnections: true,
  connectionLimit: 10,  // ajusta según tu plan
  queueLimit: 0
});

// Función para obtener conexión
export async function getConnection() {
  return pool.getConnection();
}
