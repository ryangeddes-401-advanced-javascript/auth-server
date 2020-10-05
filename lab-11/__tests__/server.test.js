// POST to /signup to create a new user
// POST to /signin to login as a user (use basic auth)
// Need tests for auth middleware and the routes
// Does the middleware function (send it a basic header)
// Do the routes assert the requirements (signup/signin)
// This is going to require more “end to end” testing that you’ve done in the past
// To test signin, your tests actually need to create a user first, then try and login, so there’s a dependency built in
// Ensure that you use supergoose to test your routes and your database



'use strict';


const supergoose = require('@code-fellows/supergoose');
//const {app } = require('../server');
const server = require('../src/server');
const user = require('../src/auth/models/users-model');
const request = supergoose(server.server);
//require('dotenv').config();
const jwt = require('jsonwebtoken');
process.env.SECRET = "sauce";


describe('api server', () => {
//beforeEach => runs before each it
//can also do beforeAll and afterAll
// afterEach(async() => {
//   await user.remove({});
//   console.log('nuked')
//   //run the command from mongoose to delete database, 
//   //bring mongoose in to do it, maybe bring in users model and remove all
//   //I can move object from line 30 outside of describe  as long as you're nuking
// });

  it('should respond with a 404 on an invalid route', async() => {
      let response = await request.get('/bad');
      console.log(response.status);
      expect (response.status).toEqual(404);
  });

  it('POST /signup creates a new user and sends an object with the user and the token to the client', async() => {
    //this tests the SHAPE of the return
    let obj = {
      "username": "boomer",
      "password": "1234",
			// "role": "guest"
    }
    let res = await request.post('/signup').send(obj);
    let output = res.body;
    console.log({output});
    expect(output.user.username).toBe(obj.username)
    expect(output.user.role).toBe(obj.role)
    expect(output.user.password).toBeDefined();
    expect(output.token).toBeDefined();
    expect (res.status).toEqual(200);
});

it('POST /signup token is valid', async() => {
    //this tests the CONTENT of the return
    
  let obj = {
    "username": "boomer",
    "password": "1234",
    "role": "guest"
  }  
  let res = await request.post('/signup').send(obj);
  let jwtVar = jwt.verify(res.body.token, process.env.SECRET);
  expect(jwtVar).toBeTruthy();
  expect(res.status).toEqual(200);

});

it('POST /signup returns valid data', async() => {
  //this tests the CONTENT of the return
  
let obj = {
  "username": "boomer",
  "password": "1234",
  "role": "guest"
}  
let res = await request.post('/signup').send(obj);
let jwtVar = jwt.verify(res.body.token, process.env.SECRET);
expect(jwtVar.username).toBe('boomer');
//expect(jwtVar.role).toBe('guest');

});

  it('POST /signin with basic authentication headers logs in a user and sends an object with the user and the token to the client', async () => {
    //NEVER REQUIRE A PREVIOUS TESTS OUTPUT ALWAYS DO A NEW OUTPUT
    let obj = {
      "username": "Fred",
      "password": "bald",
      "role": "guest"
    }  
    let res = await request.post('/signup').send(obj);
    let signin = await request.post('/signin').auth(obj.username, obj.password);
    expect(signin.body.user.username).toBe(obj.username)
    //expect(signin.body.user.role).toBe(obj.role)
    expect(signin.body.user.password).toBeDefined();
    expect(signin.body.token).toBeDefined();



  });








  // API 


  xit('POST /api/v1/todo adds an item to the DB and returns an object with the added item', async () => {
    let response = await request.get('/bad');
    console.log(response.status);
    expect (response.status).toEqual(404);
  });

  xit('GET /api/v1/todo returns a list of todo items', async () => {
    let response = await request.get('/bad');
    console.log(response.status);
    expect (response.status).toEqual(404);
  });

});
