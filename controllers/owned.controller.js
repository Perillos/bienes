
const admin = (req, res) => {
    res.render('owned/admin', {
        page: 'Mis Propiedades',
        bar: true
    })
}

// Formulario para crear una nueva propiedad

const create = (req, res) => {
    res.render('owned/create', {
        page: 'Crear Propiedad',
        bar: true
    })
}


export {
    admin,
    create
}