// tambien se puede importar de esta manera
// import Sequelize from 'sequelize'
import { DataTypes } from 'sequelize'

import db from '../config/db.js'

const User = db.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmed:  DataTypes.BOOLEAN// Si tengo un atributo puedo dejarlo sin llaves y sin type
})

export default User