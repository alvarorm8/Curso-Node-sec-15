const express = require('express');
const socketIO = require('socket.io'); //no puede trabajar directamente con express, pero si con el paquete http en que se basa express
const http = require('http'); //modulo ya preinstalado en node para poder levantar un servidor 

const path = require('path');

const app = express();
let server = http.createServer(app); //express utiliza por dentro funciones del paquete http, por eso se puede mandar como argumento

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath)); //habilitamos la carpeta pública para que cualquiera pueda acceder a ella

//IO = esta es la comunicación del backend
module.exports.io = socketIO(server); //lo exportamos para usarlo en sockets/socket.js
require('./sockets/socket');

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});