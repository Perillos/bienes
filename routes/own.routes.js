import express from "express";
import { body } from "express-validator";
import { admin, create, save, addImg, storeImg } from "../controllers/own.controller.js";
import protecRoutes from "../middleware/protecRoutes.js";
import upload from "../middleware/upFile.js";

const router = express.Router()


router.get('/mis-propiedades', protecRoutes, admin)
router.get('/propiedades/crear', protecRoutes, create)
router.post('/propiedades/crear', protecRoutes,
        body('title').notEmpty().withMessage('El titulo del Anuncio es Obligatorio'),
        body('description')
            .notEmpty().withMessage('La Descripción no puede ir vacia')
            .isLength({ max:200 }).withMessage('La Descripción es muy larga'),
        body('category').notEmpty().withMessage('Selecciona una Categoría'),
        body('price').notEmpty().withMessage('Selecciona un rango de Precio'),
        body('bedrooms').notEmpty().withMessage('Selecciona la Cantidad de Habitaciones'),
        body('rooms').isNumeric().withMessage('Selecciona la Cantidad de Estancias'),
        body('bathrooms').isNumeric().withMessage('Selecciona la Cantidad de Baños'),
        body('calle').notEmpty().withMessage('Ubica la Propiedad en el Mapa'),
        save
    )
router.get('/propiedades/agregar-imagen/:id', protecRoutes, addImg)

router.post('/propiedades/agregar-imagen/:id', protecRoutes, upload.single('image'), storeImg)

export default router