import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import User from '../models/user.model.js'
import { generateJWT, generateId } from '../helpers/tokens.js'
import { emailRegister, emailForgotPass } from '../helpers/emails.js'

const getFormLogin = (req, res) => {
    res.render('auth/login', {
        page: 'Iniciar Sesión'
    })
}

const postFormLogin = async (req, res) => {
    // Validación del formulario
    await check('email').isEmail().withMessage('El Email es Obligatorio').run(req)
    await check('password').isLength({ min: 6 }).withMessage('La contraseña es Obligatoria').run(req)

    let result = validationResult(req)

    //Verificar que el resultado este vacio
    if(!result.isEmpty()) {
        // Errores
        return res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            errors: result.array()
        })
    }

    const { email, password } = req.body

    // Comprobar si el usuario existe
    const user = await User.findOne({ where: { email }})
    if(!user) {
        // El usuario no exite
        return res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            errors: [{msg: 'El Email no existe'}]
        })
    }
    // Comprobar si el usuario está confirmado
    if(!user.confirmed) {
        return res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            errors: [{msg: 'Tu cuenta no ha sido confirmada'}]
        })
    }

    // Revisar el password
    if(!user.verifyPassword(password)) {
        return res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            errors: [{msg: 'La Contraseña es incorrecta'}]
        })
    }

    // Autenticar al usuario
    const token = generateJWT({id: user.id})

    // Almacenar una cookie

    return res.cookie('_token', token, {
        httpOnly: true,
        expires: 3600000 // lo que tarda en token en expirar en ms
        // secure: true   // parametro de seguridad donde solo deja la cookie si tienes https
        // sameSite: true
    }).redirect('/mis-propiedades')

}


const getFormRegister = (req, res) => {
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
    const existUser = await User.findOne( { where: { email: req.body.email } } ) // Busca si hay usuarios en la base de datos
    
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
    const userGern = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        token: generateId()
    })

    // Enviar email de confirmación
    emailRegister({
        nombre: userGern.name,
        email: userGern.email,
        token: userGern.token
    })

    // Mensaje de confimación
    res.render('templates/message', {
        page: 'Cuenta Creada Correctamente',
        message: 'Te hemos enviado un email de Confirmación con un Enlace, haz Click en él para Activar tu Cuenta'
    })
}

// Función que comprueba la cuenta

const getConfirm = async (req, res) => {
    // Podemos hacer destructuring
    // const { token } = req.params
    const { token } = req.params

    // Verificar si el token es válido
    // const userToken = await User.findOne( { where: { token: req.params.token } } ) // si usamos destructurin
    const userToken = await User.findOne( { where: { token } } )

    if(!userToken) {
        return res.render('auth/confirm-count', {
            page: 'Error al confirmar tu cuenta',
            message: 'Hubo un error al confirmar tu cuenta, intentalo de nuevo',
            error: true
        })
    }

    // Confirmar la cuenta
    userToken.token = null
    userToken.confirmed = true
    await userToken.save()
    res.render('auth/confirm-count', {
        page: 'Cuenta Confirmada',
        message: 'La cuenta se confirmó Correctamente',
    })

}

const getFormForgoPass = (req, res) => {
    res.render('auth/forgot-pass', {
        page: 'Recupera Tu Contraseña'
    })
}

const postFormForgoPass = async (req, res) => {
    // Validación de email correcto
    await check('email').isEmail().withMessage('Escribe un Email válido').run(req)

    let result = validationResult(req)

    if (!result.isEmpty()) { // Hay errores, resutl no esta vacio por lo que hay errores
        return res.render('auth/forgot-pass', {
            page: 'Crear Cuenta',
            errors: result.array(),
        })
    }

    // Buscar el usuario
    const { email } = req.body
    const userFind = await User.findOne( { where: {email} } )
    // Si el usuario no existe
    if (!userFind) {

    }

    // General token
    userFind.token = generateId();
    await userFind.save()

    // Enviar email
    emailForgotPass({
        email: userFind.email,
        nombre: userFind.nombre,
        token: userFind.token
    })

    // Mensaje de confimación
    res.render('templates/message', {
        page: 'Recupera tu contraseña',
        message: 'Te hemos enviado un email con las intrucciones para recuperar tu contraseña'
    })


}

const checkToken = async (req, res) => {
    
    const { token } = req.params;

    const userFind = await User.findOne( { where: {token} } )
    // Mostrar mensaje si no existe un usuario con ese token
    if(!userFind) {
        return res.render('auth/confirm-count', {
            page: 'Reestablece tu Password',
            message: 'Hubo un error al validar tu información, intentalo de nuevo.',
            error: true
        })
    }

    // Mostrar formulario para modificar el password
    res.render('auth/reset-password', {
        page: 'Reestablece tu Password'
    })
}

const postResetPass = async (req, res) => {
    // Validar el Password
    await check('password').isLength({ min: 6 }).withMessage('La contraseña tien que tener 6 caracteres').run(req)
    await check('rep_password').equals(req.body.password).withMessage('Las contraseña no son iguales').run(req)
    let result = validationResult(req)
    
    // Verificar los errores
    if(!result.isEmpty()) {
        // Errores
        return res.render('auth/reset-password', {
            page: 'Reestablece tu Password',
            errors: result.array()
        })
    }

    const { token } = req.params;
    const { password } = req.body;

    // Indentificar quien hace el cambio
    const user = await User.findOne( { where: {token} } )

    // Hashear el nuevo password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash( password, salt);
    user.token = null;

    await user.save();

    res.render('auth/confirm-count', {
        page: 'Contraseña Reestablecida',
        message: 'La Contraseña se guardo correctamente'
    })
}



export {
    getFormLogin,
    postFormLogin,
    getFormRegister,
    postRegister,
    getConfirm,
    getFormForgoPass,
    postFormForgoPass,
    checkToken,
    postResetPass
}