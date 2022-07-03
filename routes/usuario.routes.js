import express from 'express';


const router = express.Router();


router.get('/', function(req, res) {
    res.json({msg: 'Hola'})
});



export default router
