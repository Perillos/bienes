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
    await check('name').notEmpty().withMessage('El Nombre no puede ir vacio').run(req)
    await check('email').isEmail().withMessage('Escribe un Email válido').run(req)
    await check('password').isLength({ min: 6 }).withMessage('La contraseña tien que tener 6 caracteres con letras y números').run(req)
    await check('rep_password').equals(req.body.password).withMessage('Las contraseña no son iguales').run(req)

    let result = validationResult(req)

    // Comprobar que la validacióna ha pasado para llevar los datos a la BBDD
    if (!result.isEmpty()) { // Hay errores, resutl no esta vacio por lo que hay errores
        return res.render('auth/register', {
            page: 'Crear Cuenta',
            errors: result.array(),
            // Cuando un usuario pone algún dato mas se borra, con esto se quedan los datos anteriormente insertados para que no los tenga que repetir.
            user: {
                name: req.body.name,
                email: req.body.email
            }
        })
        
    }

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