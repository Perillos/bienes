import express from 'express';


const router = express.Router();


router.get('/', function(req, res) {
    res.json({msg: 'Respuesta de tipo Get'})
});

router.post('/', function(req, res) {
    res.json({msg: 'Respuesta de tipo Post'})
})


export default router
