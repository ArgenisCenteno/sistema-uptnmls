import express from "express";
import { crearIncorporacion, obtenerIncorporacion, obtenerIncorporaciones  } from "../controllers/incorporacion.js";
 
const router = express.Router();

router.post("/crear-incorporacion", crearIncorporacion);  
router.get("/obtener-incorporaciones", obtenerIncorporaciones);  
router.get("/obtener-incorporacion/:id", obtenerIncorporacion)
  
export default router

