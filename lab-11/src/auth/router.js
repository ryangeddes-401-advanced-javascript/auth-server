'use strict';

const express = require('express');
//const modelFinder = require('../auth/middleware/model-finder');
const router = express.Router();
const users = require('../auth/models/users-model')
const basicAuth = require('../auth/middleware/basic')
//router.param('model', modelFinder.getter);


router.post('/signup', signUp);



async function signUp(req, res, next){

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
    let output = {
      token:token,
      user:newUser
    }

    res.status(200).json(output);


  } catch (e) {
    next(e.message);
  }

  // let record = await req.model.create(req.body);
  // res.status(201).json(record);

};

router.post('/signin', basicAuth, async (req,res, next)=>{ 
  console.log('WE\'RE HITTING SIGN IN');
  //res.setHeader('Authorization', `Bearer ${req.token}`);
  //res.setHeader('Cookie', `${req.token}`);
  //THIS IS THE WAY
  res.set('auth', req.token);

  try{
    let output = {
      token: req.token,
      user: req.user
    }
    res.status(200).json(output);
  } catch (e) {
    next(e.message);
  }

});









async function getAll(req, res, next){
  try{
    let data = await req.model.read();
    let results = {
      count: data.length,
      results: data
    };
    res.status(200).json(results);
} catch(err){
    next('no model')
    console.error(err.message)
}

};

async function getOne(req, res, next){
  let id = req.params.id;
  console.log('line 41 id',id)
  let record = await req.model.read(id);
  console.log('line 42 record',record)
  res.status(200).json(record);
};

async function update(req, res, next){
  let id = req.params.id;
  let newRecord = req.body;
  let record = await req.model.update(id, newRecord);
  res.status(200).json(record);
};



async function destroy(req, res, next){
  let id = req.params.id;
  await req.model.destroy(id);
  res.status(200).json(req.params)

};




module.exports = router;