import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import evaluacionesRoutes from "./Routers/evaluaciones.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Ruta principal para evaluaciones
app.use("/evaluaciones", evaluacionesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
