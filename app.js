require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const routes = require('./src/routes/auth');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

process.on('unhandledRejection', error => {
  console.log(` [x] Unhandled Rejection ${error.message}`);
});

module.exports = app;
