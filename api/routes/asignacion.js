import express from "express";
import { actualizarAsignacion, crearAsignacion, eliminarAsignacionPorId, obtenerAsignacionPorId, obtenerAsignacionesPorRangoDeFecha, obtenerTodasLasAsignaciones } from "../controllers/asignacion.js";
 
const router = express.Router();

router.post("/crear-asignacion", crearAsignacion);
router.put("/actualizar-asignacion", actualizarAsignacion);
router.get("/obtener-asignaciones", obtenerTodasLasAsignaciones);
router.get("/obtenerAsignacionesPorId/:id", obtenerAsignacionPorId);
router.delete("/eliminar-asignacion/:id", eliminarAsignacionPorId);
router.get("/obtenerAsignacionPorRango", obtenerAsignacionesPorRangoDeFecha)

export default router
