import  {Router} from 'express';
const router = Router();

import {loginUser,registerUser} from '../controllers/usersController.js';

router.post('/login', loginUser); //POST
router.post('/register', registerUser); //POST

export default router;