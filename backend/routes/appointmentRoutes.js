import express from "express";
import { createAppointment } from "../controllers/appointmentController.js";
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

//router.get('/', getUserAppointments)
router.post('/', authMiddleware, createAppointment) //user can add appointments only if is auth

export default router