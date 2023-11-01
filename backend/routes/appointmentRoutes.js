import express from "express";
import { createAppointment,  getAppointmentByDate, getAppointmentById, updateAppointment} from "../controllers/appointmentController.js";
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

//router.get('/', getUserAppointments)
router.post('/', authMiddleware, createAppointment) //user can add appointments only if is auth
router.get('/', authMiddleware, getAppointmentByDate)
router.get('/:id', authMiddleware, getAppointmentById)
router.put('/:id', authMiddleware, updateAppointment)

export default router