import express from "express";
import { crearTransferencia, obtenerTransferencias } from "../controllers/transferencia.js";
  
const router = express.Router();

router.post("/crear-transferencia", crearTransferencia);
router.get("/obtener-transferencias", obtenerTransferencias);  


export default router

