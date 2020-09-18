'use strict';


//third party
const express = require('express');
const base64 = require('base-64');
const notFoundHandler = require('./middleware/404');
const errorHandler = require('./middleware/500');

const app = express();

// global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.post('/signup', async (req, res, next) => {

  try {
    // username, password, email, etc ..
    // will be on req.body

    // use the users module to create a new user

    // Create an object that looks like the data model shape
    let obj = {
      username: req.body.username,
      password: req.body.password
    }

    // Create a new instance from the schema, using that object
    let record = new users(obj);

    // Save that instance to the database
    let newUser = await record.save();

    let token = record.generateToken();

    // Prove it
    res.status(201).send(token);


  } catch (e) {
    next(e.message);
  }

});

app.post('/signin', async (req, res, next) => {

  try {
    // Get the username and password from the user
    // It will be in the headers
    let authorization = req.headers.authorization;
    let encoded = authorization.split(' ')[1]
    let creds = base64.decode(encoded);
    let [username, password] = creds.split(":");

    // Get user instance from the model, if we can.
    let userRecord = await users.validateBasic(username, password);

    // If it's good, send a token
    let token = userRecord.generateToken();

    res.status(201).send(token);

  } catch (e) {
    next(e.message);
  }

});


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