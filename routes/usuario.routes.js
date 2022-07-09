import express from 'express';
import { formForgoPass, formularioLogin, formularioRegistro } from '../controllers/usuario.controller.js';


const router = express.Router();


router.get('/login', formularioLogin);
router.get('/registro', formularioRegistro)
router.get('/forgotPass', formForgoPass)



export default router
