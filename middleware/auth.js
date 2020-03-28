const express = require('express')
const request = require('request')
const empty = require('./../libs/repete')
const token = require('./../libs/tokenLib')
const mongoose = require('mongoose')
const mod = require('./../models/Auth')
const auth = mongoose.model('Auth');
const api = require('./../libs/apistructure')

let authorized = (req, res, next) => {
  
    if (req.params.authtoken || req.query.authtoken || req.body.authtoken || req.header('authtoken')) {
        auth.findOne({authtoken: req.header('authtoken') || req.params.authtoken || req.body.authtoken || req.query.authtoken}, (err, authDetails) => {
          if (err) {
            console.log(err)
            // logger.error(err.message, 'AuthorizationMiddleware', 10)
            let apiResponse = api.apiresponse(true, 'Failed To Authorized', 500, null)
            res.send(apiResponse)
          } else if (empty.empty(authDetails)) {
            // logger.error('No AuthorizationKey Is Present', 'AuthorizationMiddleware', 10)
            let apiResponse =api.apiresponse(true, 'Invalid Or Expired AuthorizationKey', 404, null)
            res.send(apiResponse)
          } else {
            token.verifyToken(authDetails.authtoken,authDetails.tokenSecrete,(err,decoded)=>{
    
                if(err){
                    // logger.error(err.message, 'Authorization Middleware', 10)
                    let apiResponse =api.apiresponse(true, 'Failed To Authorized', 500, null)
                    res.send(apiResponse)
                }
                else{
                    
                    req.user = {userId: decoded.data.userId}
                    next()
                }
    
    
            });// end verify token
           
          }
        })
      } else {
        // logger.error('AuthorizationToken Missing', 'AuthorizationMiddleware', 5)
        let apiResponse =api.apiresponse(true, 'AuthorizationToken Is Missing In Request', 400, null)
        res.send(apiResponse)
      }
}

module.exports = {
    authorized: authorized
}