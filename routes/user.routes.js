import express from 'express';
import { getFormLogin, getFormRegister, postRegister, getConfirm, getFormForgoPass, postFormForgoPass, getResetPass, postResetPass } from '../controllers/user.controller.js';


const router = express.Router();


router.get('/login', getFormLogin);
router.get('/register', getFormRegister);
router.post('/register', postRegister);
router.get('/confirm/:token', getConfirm)
router.get('/forgotPass', getFormForgoPass)
router.post('/forgotPass', postFormForgoPass)
router.get('/forgotPass/:token', getResetPass)
router.post('/forgotPass/:token', postResetPass)



export default router
