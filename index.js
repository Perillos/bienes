// const express = require('express');
import express from 'express'
import userRoutes from './routes/user.routes.js'
import db from './config/db.js'

// Crar la app
const app = express()

// Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended: true}))

// Conexión a la base de datos
try {
    await db.authenticate();
    db.sync()
    console.log('Conexión Correcta a la Base de Datos');
} catch (error) {
    console.log('Error en la conexión con al base de datos');
}

// Habiliar pug
app.set('view engine', 'pug')
// La carpeta donde estan las vistas
app.set('views', './views')


// Carptea pública
app.use( express.static('public'))

// Routing
app.use('/auth', userRoutes)


// Define el puerto
const port = 3000;

// Arranque del proyecto
app.listen(port, () => {
    console.log(`El Servidor esta funcionando en el puero http://localhost:${port}`);
})

