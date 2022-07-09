

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
    res.render('auth/forgot-pass', {
        page: 'Recupera Tu Contraseña'
    })
}


export {
    formLogin,
    forRegister,
    formForgoPass
}