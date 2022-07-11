import express from 'express';
import { formForgoPass, formRegister, formLogin, postRegister } from '../controllers/user.controller.js';


const router = express.Router();


router.get('/login', formLogin);
router.get('/register', formRegister);
router.post('/register', postRegister);
router.get('/forgotPass', formForgoPass)



export default router
