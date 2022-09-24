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
         const user = await User.findByPk(decoded.id)
         console.log(user);

    } catch (error) {
        return res.clearCookie('_token').redirect('/auth/login')
    }
    next()
}

export default protecRoutes