import express from 'express';
import {createService, getServiceById, getAllServices} from '../controllers/serviceController.js';

const router = express.Router();

router.post('/', createService);
router.get('/', getAllServices);
router.get('/:id', getServiceById);

export default router