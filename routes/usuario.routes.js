import express from 'express';
import { formForgoPass, forRegister, formLogin } from '../controllers/usuario.controller.js';


const router = express.Router();


router.get('/login', formLogin);
router.get('/register', forRegister)
router.get('/forgotPass', formForgoPass)



export default router
