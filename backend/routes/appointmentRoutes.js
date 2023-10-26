import express from "express";
import { createAppointment,  getAppointmentByDate} from "../controllers/appointmentController.js";
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

//router.get('/', getUserAppointments)
router.post('/', authMiddleware, createAppointment) //user can add appointments only if is auth
router.get('/', authMiddleware, getAppointmentByDate)

export default router