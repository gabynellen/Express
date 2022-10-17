const http = require('http')
import { Contenedor} from './manejoDeArchivos'

//let manejoDeArchivos = new Contenedor();
const express = require('express');

const app = express();

app.get('/',(req, res)=>{
    res.json({mensaje: 'hola'})
})

const server = app.listen(8080, ()=>{
    console.log('server levantado en el server: 8080')
})