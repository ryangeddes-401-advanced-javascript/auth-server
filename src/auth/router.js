'use strict';

const express = require('express');
const modelFinder = require('../middleware/modelFinder');
const router = express.Router();

router.param('model', modelFinder.getter);


router.get('/:signin/:id', getOne);
router.post('/signup', create);



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

async function create(req, res, next){
  let record = await req.model.create(req.body);
  res.status(201).json(record);

};

async function destroy(req, res, next){
  let id = req.params.id;
  await req.model.destroy(id);
  res.status(200).json(req.params)

};




module.exports = router;