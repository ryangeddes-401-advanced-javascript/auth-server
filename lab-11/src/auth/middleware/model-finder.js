'use strict';

function getter (req, res, next) {
  const modelName = req.params.model;
  const idName = req.params.id;
  console.log('modelname', modelName);
  console.log('id', idName);

  if (fileExist(modelName)){
    req.model = require(`../models/${modelName}/${modelName}-model.js`);
  }
  else{
    console.log('MODEL DOES NOT EXIST');
  }
  next();
};


function fileExist(modelName){
  const fs = require('fs');
  const path = `./lib/models/${modelName}/${modelName}-model.js`;
  try {
    if (fs.existsSync(path)) {
      return true;
    }
    else{
      return false;
    }
  } catch(err) {
    console.error(err.message);
  }

}

module.exports = {getter};