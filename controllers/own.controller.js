import Price from '../models/price.model'
import Category from '../models/category.model'


const admin = (req, res) => {
    res.render('own/admin', {
        page: 'Mis Propiedades',
        bar: true
    })
}

// Formulario para crear una nueva propiedad

const create = async (req, res) => {

    // Consulatar Modelo de Precio y Categorias
    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])



    res.render('own/create', {
        page: 'Crear Propiedad',
        bar: true,
        categories, // Object literal de JS categories: categories
        prices
    })
}


export {
    admin,
    create
}