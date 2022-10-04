import { validationResult } from 'express-validator'
import { Price, Category, Own } from '../models/index.model.js'


import { body } from "express-validator";
const admin = (req, res) => {
    res.render('own/admin', {
        page: 'Mis Propiedades'
    })
}

// Formulario para crear una nueva propiedad

const create = async (req, res) => {
    body('title').notEmpty().withMessage('El titulo del Anuncio es Obligatorio')
    // Consulatar Modelo de Precio y Categorias
    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])

    res.render('own/create', {
        page: 'Crear Propiedad',
        categories, // Object literal de JS categories: categories
        prices,
        data: {}
    })
}

const save = async (req, res) => {

    // Validación
    let result = validationResult(req)
    
    if(!result.isEmpty()) {

        // Consulatar Modelo de Precio y Categorias
        const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
        ])
        
        return res.render('own/create', {
            page: 'Crear Propiedad',
            categories,
            prices,
            errors: result.array(),
            data: req.body
        })
    }
    
    // Crear un Registro

    const { title, description, bedrooms, rooms, bathrooms, calle, lat, lng, price: priceId, category: categoryId } = req.body // Al usar destructuring, se puede cambiar en nombre a la variable como en price y category
    const { id: userId } = req.user

    try {
        const ownesSaving = await Own.create({
            title,
            description,
            bedrooms,
            rooms,
            bathrooms,
            calle,
            lat,
            lng,
            priceId, // otra opción es no cambiar el nombre en el destructuring y asignarlo aquí, sería: price: priceId
            categoryId,
            userId,
            imagen: ''
        })

        const { id } = ownesSaving

        res.redirect(`/propiedades/agregar-imagen/${id}`)


    } catch (error) {
        console.log(error);
    }
}

const addImg = async (req, res) => {

    const { id } = req.params

    // Validar que la propiedad exita
    const owner = await Own.findByPk(id)

    if(!owner) {
        return res.redirect('/mis-propiedades')
    }

    // Validar que la propiedad no esté publicada

    if(owner.publicado) {
        return res.redirect('/mis-propiedades')
    }

    // Validar que la propiedad pertenece a quien visita esta página

    if(req.user.id.toString() !== owner.userId.toString()) {
        return res.redirect('/mis-propiedades')
    }


    res.render('own/add-img', {
        page: 'Agregar Imagenes'
    })
}

export {
    admin,
    create,
    save,
    addImg
}