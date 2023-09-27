import express from 'express';
import {createService, getServiceById, getAllServices, updateService} from '../controllers/serviceController.js';

const router = express.Router();

router.post('/', createService);
router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.put('/:id', updateService);

export default router