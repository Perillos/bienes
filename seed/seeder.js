import { exit } from 'node:process'
import categories from './categories.js'
import prices from './prices.js'
import users from './users.js'
import db from '../config/db.js'
import { Category, Price, User } from '../models/index.model.js'


const importarDatos = async () => {
    try {
        // Autoenticar
        await db.authenticate()

        // Generar las Columnas
        await db.sync()

        // Borrar datos
        // await Category.delete(categories);
        // await Price.delete(prices);
        // console.log('Datos Borrados Correctamente')

        // Insertar los datos
            // En este caso se inserta categorias y cuando termina se inserta precio. En el caso de que una tabla dependa de la otra es correcto hacer de esta manera.
        // await Category.bulkCreate(categories)
        // await Price.bulkCreate(price)
        
            // En el caso de que las tablas no dependan una de la otra. La inserción se puede hacer a la vez. Para ello utilizamos una Promesa
        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices),
            User.bulkCreate(users),
        ])

        console.log('Datos Importados Correctamente')
        exit()

    } catch (error) {
        console.log(error)
        exit(1)
    }
}

const eliminarDatos = async () => {
    try {
        // await Promise.all([
        //     Category.destroy({where: {}, truncate: true}),
        //     Price.destroy({where: {}, truncate: true})
        // ])

        await db.sync({force: true})
        console.log('Datos Eliminados Correctamente')
        exit()
    } catch (error) {
        console.log(error)
        exit(1)
    }
}


if (process.argv[2] === "-i") {
    importarDatos()
}

if (process.argv[2] === "-e") {
    eliminarDatos()
}