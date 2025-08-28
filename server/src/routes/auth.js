import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import { auth } from '../middlewares/auth.js';
import { validateRegister, validateLogin } from '../validators/authValidator.js';


const router = Router();


router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', auth, me);


export default router;