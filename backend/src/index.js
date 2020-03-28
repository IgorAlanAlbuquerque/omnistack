const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
/*
* tipos de parametros
* query que passa na ? nomeando os valores =
* params que funciona como um id usando :
* body 
*/

app.listen(3333);