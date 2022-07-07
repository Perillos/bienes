// const express = require('express');
import express from 'express'
import usuarioRoutes from './routes/usuario.routes.js'

// Crar la app
const app = express()

// Habiliar pug
app.set('view engine', 'pug')
// La carpeta donde estan las vistas
app.set('views', './views')


// Carptea pública
app.use()

// Routing
app.use('/auth', usuarioRoutes)


// Define el puerto
const port = 3000;

// Arranque del proyecto
app.listen(port, () => {
    console.log(`El Servidor esta funcionando en el puero ${port}`);
})

