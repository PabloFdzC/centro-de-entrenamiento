const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');
const OperacionesSng = require('./Controller/OperacionesSng.js');
const opSng = OperacionesSng.getInstance();

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

app.use(session({
  secret: 'm!S3ssi0nn0de',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }
}));

app.use('/', opSng.getOperacionesAdministrador());
app.use('/', opSng.getOperacionesClase());
app.use('/', opSng.getOperacionesCliente());
app.use('/', opSng.getOperacionesInstructor());
app.use('/', opSng.getOperacionesJornada());
app.use('/', opSng.getOperacionesNavegacion());
app.use('/', opSng.getOperacionesPago());
app.use('/', opSng.getOperacionesSala());
app.use('/', opSng.getOperacionesServicio());
app.use('/', opSng.getOperacionesUsuario());

app.listen(app.get('port'));