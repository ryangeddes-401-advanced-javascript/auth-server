'use strict';


//third party
const express = require('express');
const base64 = require('base-64');
const notFoundHandler = require('./auth/middleware/404');
const errorHandler = require('./auth/middleware/500');
const router = require('../src/auth/router');
const app = express();

// global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

//ROUTES


//error handlers
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};