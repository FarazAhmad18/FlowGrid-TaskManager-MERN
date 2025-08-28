import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { overview } from '../controllers/statsController.js';


const router = Router();


router.use(auth);
router.get('/overview', overview);


export default router;