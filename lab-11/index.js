'use strict';

require('dotenv').config();
let mongoose = require('mongoose');
let server = require('./src/server.js');

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

server.start(process.env.PORT);