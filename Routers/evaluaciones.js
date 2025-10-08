import express from "express";
import { getConnection } from "../Conexiones.js";

const router = express.Router();

// Registrar evaluación
router.post("/", async (req, res) => {
  const {
    nombreCatedratico,
    curso,
    pregunta1,
    pregunta2,
    pregunta3,
    pregunta4,
    pregunta5,
    comentario,
  } = req.body;

  if (!comentario || comentario.trim() === "") {
    return res.status(400).json({ error: "El comentario es obligatorio" });
  }

  let conn;
  try {
    conn = await getConnection();
    await conn.query(
      `INSERT INTO evaluaciones 
        (nombreCatedratico, curso, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, comentario)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombreCatedratico, curso, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, comentario]
    );

    res.json({ message: "Evaluación registrada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    if (conn) conn.release();
  }
});

// Obtener resultados de evaluaciones
router.get("/resultados", async (req, res) => {
  let conn;
  try {
    conn = await getConnection();

    const [rows] = await conn.query(`
      SELECT nombreCatedratico, curso,
        COUNT(*) AS cantidadRespuestas,
        ROUND(AVG((pregunta1+pregunta2+pregunta3+pregunta4+pregunta5)/5), 2) AS promedioCatedratico
      FROM evaluaciones
      GROUP BY nombreCatedratico, curso
    `);

    const [total] = await conn.query(`
      SELECT ROUND(AVG((pregunta1+pregunta2+pregunta3+pregunta4+pregunta5)/5), 2) AS promedioGeneral
      FROM evaluaciones
    `);

    res.json({
      resultado: rows,
      promedioGeneral: total[0]?.promedioGeneral || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener resultados" });
  } finally {
    if (conn) conn.release();
  }
});

export default router;
