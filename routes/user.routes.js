import express from 'express';
import { getFormLogin, postFormLogin, getFormRegister, postRegister, getConfirm, getFormForgoPass, postFormForgoPass, checkToken, postResetPass } from '../controllers/user.controller.js';


const router = express.Router();


router.get('/login', getFormLogin);
router.post('/login', postFormLogin);
router.get('/register', getFormRegister);
router.post('/register', postRegister);
router.get('/confirm/:token', getConfirm)
router.get('/forgotPass', getFormForgoPass)
router.post('/forgotPass', postFormForgoPass)
router.get('/forgotPass/:token', checkToken)
router.post('/forgotPass/:token', postResetPass)



export default router
