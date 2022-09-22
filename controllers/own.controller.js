import { validationResult } from 'express-validator'
import Price from '../models/price.model.js'
import Category from '../models/category.model.js'

import { body } from "express-validator";
const admin = (req, res) => {
    res.render('own/admin', {
        page: 'Mis Propiedades',
        bar: true
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
        bar: true,
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
            bar: true,
            categories,
            prices,
            errors: result.array(),
            data: req.body
        })
    }
}

export {
    admin,
    create,
    save
}