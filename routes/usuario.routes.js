import express from 'express';
import { formForgoPass, formRegister, formLogin } from '../controllers/usuario.controller.js';


const router = express.Router();


router.get('/login', formLogin);
router.get('/register', formRegister)
router.get('/forgotPass', formForgoPass)



export default router
