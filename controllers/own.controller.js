
const admin = (req, res) => {
    res.render('own/admin', {
        page: 'Mis Propiedades',
        bar: true
    })
}

// Formulario para crear una nueva propiedad

const create = (req, res) => {
    res.render('own/create', {
        page: 'Crear Propiedad',
        bar: true
    })
}


export {
    admin,
    create
}