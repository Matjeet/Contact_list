'use strict'

var mongoose = require('mongoose')
var app = require('./app')

mongoose.connect('mongodb://127.0.0.1:27017/repasoFinal').then(
    () => {
        console.log("Conexion con BBDD exitosa");
        app.listen(8698, function(){
            console.log("El servidor web se ha iniciado correctamente");
        });
    },
    err => {
        console.log("Conexion con BBDD fallida");
    }
)