import bcrypt from 'bcrypt'

const users = [
    {
        name: 'Fernando',
        email: 'fer@fer.es',
        confirmed: 1,
        password: bcrypt.hashSync('ElMejorTipo', 10)
    }
]

export default users