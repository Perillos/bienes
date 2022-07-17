import express from 'express';
import { formForgoPass, formRegister, formLogin, postRegister, getConfirm } from '../controllers/user.controller.js';


const router = express.Router();


router.get('/login', formLogin);
router.get('/register', formRegister);
router.post('/register', postRegister);
router.get('/confirm/:token', getConfirm)
router.get('/forgotPass', formForgoPass)



export default router
