// const express = require('express');
import express from 'express'
import usuarioRoutes from './routes/usuario.routes.js'

const app = express()

app.use('/us', usuarioRoutes)

const port = 3000;

app.listen(port, () => {
    console.log(`El Servidor esta funcionando en el puero ${port}`);
})

