import { check, validationResult } from 'express-validator'
import User from '../models/user.model.js'
import { generarId } from '../helpers/tokens.js'

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
    await check('password').isLength({ min: 6 }).withMessage('La contraseña tien que tener 6 caracteres').run(req)
    await check('rep_password').equals(req.body.password).withMessage('Las contraseña no son iguales').run(req)

    let result = validationResult(req)

    // Comprobar que la validacióna ha pasado para llevar los datos a la BBDD
    if (!result.isEmpty()) { // Hay errores, resutl no esta vacio por lo que hay errores
        return res.render('auth/register', {
            page: 'Crear Cuenta',
            // Muestra los errores
            errors: result.array(),
            // Cuando un usuario pone algún dato mal se borra, con esto se quedan los datos anteriormente insertados para que no los tenga que repetir.
            user: {
                name: req.body.name,
                email: req.body.email
            }
        })
    }
    // Tambien puedo extra los datos con destructuring
    // const { nombre, email, password } = req.body
    // Con object literal y destructuring no hace falta poner email: req.body.email, pondría email: email y como es igual se puedo poner solo email.

    // Verificar que el usuario no está duplicado
    const existUser = await User.findOne( { were: { email: req.body.email } } ) // Busca si hay usuarios en la base de datos
    
    if (existUser) { // Si encuentra pasa por el if
        return res.render('auth/register', {
            page: 'Crear Cuenta',
            // Muestra los errores
            errors: [{msg: 'El usuario ya está registrado'}],
            // Cuando un usuario pone algún dato mal se borra, con esto se quedan los datos anteriormente insertados para que no los tenga que repetir.
            user: {
                name: req.body.name,
                email: req.body.email
            }
        })
    }

    // Enviar a la BBDD el usuario
    // await User.create(req.body) con esto creamos el usuario con los datos que ingresa en el formulario, pero queremos enviar más datos
    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        token: 123
    })

    
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