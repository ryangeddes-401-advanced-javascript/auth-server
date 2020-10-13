'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');



// Esoteric Resources
const oauth = require('./google.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Website Files
app.use(express.static('./public'));

// Routes
app.get('/oauth', oauth, (req, res) => {
  res.status(200).send(req.token);
});

app.post('/oauth', oauth, (req, res) => {
  let code = JSON.stringify(req.body);
  console.log('OAUTH ROUTE HIT WITH POST');
  console.log('req', req.body);
  res.status(200).json(code);
});

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
