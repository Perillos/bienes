import { exit } from 'node:process'
import categories from './categories.js'
import price from './price.js'
import Categories from '../models/category.model.js'
import Price from '../models/price.model.js'
import db from '../config/db.js'



const importarDatos = async () => {
    try {
        // Autoenticar
        await db.authenticate()

        // Generar las Columnas
        await db.sync()

        // Borrar datos
        // await Categories.delete(categories);
        // await Price.delete(price);
        // console.log('Datos Borrados Correctamente')

        // Insertar los datos
        await Categories.bulkCreate(categories)
        await Price.bulkCreate(price)
        console.log('Datos Importados Correctamente')
        exit()

    } catch (error) {
        console.log(error)
        exit(1)
    }
}


if (process.argv[2] === "-i") {
    importarDatos()
}