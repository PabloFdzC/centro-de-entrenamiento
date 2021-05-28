const express = require('express');
const morgan = require('morgan');

const app = express();

app.set('port', 3000);
app.use(morgan('dev'));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({extended:true, limit: '100mb'}));

app.use('/', require('./View/navigation.js'));

app.listen(app.get('port'));