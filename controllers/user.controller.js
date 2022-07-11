import { check, validationResult } from 'express-validator'
import User from '../models/user.model.js'

const formLogin = (req, res) => {
    res.render('auth/login', {
        page: 'Iniciar Sesión'
    })
}

const formRegister = (req, res) => {
    res.render('auth/register', {
        page: 'Crear Cuenta'
    })
}

const postRegister = async (req, res) => {
    // Validación
    await check('name').notEmpty().run(req)

    let result = validationResult(req)

    res.json(result)

    const user = await User.create(req.body)
    res.json(user)
}

const formForgoPass = (req, res) => {
    res.render('auth/forgot-pass', {
        page: 'Recupera Tu Contraseña'
    })
}


export {
    formLogin,
    formRegister,
    postRegister,
    formForgoPass
}