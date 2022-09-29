import jwt from 'jsonwebtoken'
import { User } from '../models/index.model.js'

const protecRoutes = async (req, res, next) => {
    
    // Verificar si hay un token
    const  { _token }  = req.cookies

    if(!_token) {
        return res.redirect('/auth/login')
    }
    // Comprobar el _token
    try {
         const decoded = jwt.verify(_token, process.env.JWR_SECRET)
         const user = await User.scope('deletePassword').findByPk(decoded.id)

         // Almacenar el usuario al Req
         if(user) {
            req.user = user
        } else {
            return res.clearCookie('_token').redirect('/auth/login')
        }
        return next()
        
    } catch (error) {
        return res.clearCookie('_token').redirect('/auth/login')
    }
}

export default protecRoutes