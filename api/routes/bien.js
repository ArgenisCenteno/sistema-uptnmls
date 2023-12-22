import express from "express";
import { actualizarBien, crearBien, eliminarBien, obtenerBienPorId, obtenerBienPorRango, obtenerBienes } from "../controllers/bien.js";

const router = express.Router();

router.post("/crear-bien", crearBien);
router.put("/actualizar-bien/:id_bien", actualizarBien)
router.get("/obtener-bienes", obtenerBienes)
router.get("/obtenerBienPorId/:id_bien", obtenerBienPorId)
router.get("/obtenerBienesPorRango", obtenerBienPorRango)
router.delete("/eliminar-bien/:id", eliminarBien)

  
export default router

