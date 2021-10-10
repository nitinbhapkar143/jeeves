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

app.use(errorHandler);

process.on('unhandledRejection', error => {
  console.log(` [x] Unhandled Rejection ${error.message}`);
});

module.exports = app;
