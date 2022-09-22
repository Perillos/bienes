import express from "express";
import { body } from "express-validator";
import { admin, create, save } from "../controllers/own.controller.js";

const router = express.Router()


router.get('/mis-propiedades', admin)
router.get('/propiedades/crear', create)
router.post('/propiedades/crear',
        body('title').notEmpty().withMessage('El titulo del Anuncio es Obligatorio'),
        body('description')
            .notEmpty().withMessage('La Descripción no puede ir vacia')
            .isLength({ max:200 }).withMessage('La Descripción es muy larga'),
        body('category').notEmpty().withMessage('Selecciona una Categoría'),
        body('price').notEmpty().withMessage('Selecciona un rango de Precio'),
        body('bedrooms').notEmpty().withMessage('Selecciona la Cantidad de Habitaciones'),
        body('rooms').isNumeric().withMessage('Selecciona la Cantidad de Estancias'),
        body('bathroom').isNumeric().withMessage('Selecciona la Cantidad de Baños'),
        body('calle').notEmpty().withMessage('Ubica la Propiedad en el Mapa'),
    save
    )


export default router