import express from "express";
import {register, verifyUser, login, user} from '../controllers/authController.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


//Auth and registration routes
router.post('/register', register);
router.get('/verify/:token', verifyUser);
router.post('/login', login);


//Needs auth - requires jwt
router.get('/user', authMiddleware, user)


export default router