import express from 'express';
import { getUniversities, getCatFact } from '../controllers/externalController.js';

const router = express.Router();

router.get('/universities', getUniversities);
router.get('/catfact', getCatFact);

export default router;
