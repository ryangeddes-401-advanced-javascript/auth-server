

'use strict';
const base64 = require('base-64');
const users = require('../../auth/models/users-model')

module.exports = async (req, res, next) =>{


  try{
    let authorization = req.headers.authorization;
    let encoded = authorization.split(' ')[1]
    let creds = base64.decode(encoded);
    // console.log({creds});
    let [username, password] = creds.split(":");
    // console.log({username});
    // console.log({password});
    let userRecord = await users.validateBasic(username, password)
    // console.log({userRecord});
    req.token = userRecord.generateToken();

    req.user = userRecord;
    next();
    // if (user){
    //   console.log('user is valid!');
    //   next();
    // } else{
    //   next('INVALID PASSWORD');
    // }
  } catch (e) {
    next(e.message);
  }

}

