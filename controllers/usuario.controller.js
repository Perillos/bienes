

const formLogin = (req, res) => {
    res.render('auth/login', {
        page: 'Iniciar sesión'
    })
}

const forRegister = (req, res) => {
    res.render('auth/register', {
        page: 'Crear Cuenta'
    })
}

const formForgoPass = (req, res) => {
    res.render('auth/registro', {

    })
}


export {
    formLogin,
    forRegister,
    formForgoPass
}