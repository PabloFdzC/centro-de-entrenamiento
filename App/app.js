const express = require('express');
const morgan = require('morgan');
const path = require('path');
const operacionesSng = require('./Controller/OperacionesSng.js');
const opSng = operacionesSng.getInstance();

const viewsPath = path.join(__dirname, 'View');
const ejsViewsPath = path.join(__dirname, 'View/Ejs');

const app = express();

app.set('port', 3000);
app.use(morgan('dev'));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({extended:true, limit: '100mb'}));
app.set('view engine', 'ejs');
app.use(express.static(viewsPath));
app.set('views', ejsViewsPath);

app.use('/', require('./View/navegacion.js'));
app.use('/', opSng.getOperacionesAdministrador());
app.use('/', opSng.getOperacionesPago());
app.use('/', opSng.getOperacionesSala());
app.use('/', opSng.getOperacionesServicios());
app.use('/', opSng.getOperacionesInstructor());
app.use('/', opSng.getOperacionesClase());
app.use('/', opSng.getOperacionesUsuario());
app.use('/', opSng.getOperacionesCliente());

app.listen(app.get('port'));