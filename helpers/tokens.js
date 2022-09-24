
import jwt from 'jsonwebtoken'

const generateJWT = data => jwt.sign({ id: data.id }, process.env.JWR_SECRET, { expiresIn: '3600s' })


const generateId = () => Math.random().toString(32).substring(2) + Date.now().toString(32)

export {
    generateJWT,
    generateId
}