import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import evaluacionesRoutes from "./Routers/evaluaciones.js"; // <-- aquí es importante el .js

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/evaluaciones", evaluacionesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
