require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const errorHandler = require("./src/handlers/error");

const routes = require('./src/routes/routes');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);
app.use(express.static(__dirname+ '/coverage'));
app.use(express.static(__dirname+ '/doc'));

app.use(errorHandler);

process.on('unhandledRejection', error => {
  console.log(` [x] Unhandled Rejection ${error.message}`);
});

module.exports = app;
