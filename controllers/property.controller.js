
const admin = (req, res) => {
    res.render('property/admin', {
        page: 'Mis Propiedades',
        bar: true
    })
}


export {
    admin
}