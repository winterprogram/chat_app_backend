const express = require('express')
const app = express()
const empty = require('./../libs/repete')
const api = require('./../libs/apistructure')
const mongoose = require('mongoose')
const model = require('./../models/Signup')
const signupm = mongoose.model('Signup');
const randomize = require('randomatic');
const bcrypt = require('bcrypt')
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const token = require('./../libs/tokenLib')
const mod = require('./../models/Auth')
const auth = mongoose.model('Auth');

let createuser = (req, res) => {
    let validuser = () => {
        return new Promise((resolve, reject) => {
            console.log('validuser')
            if (req.body.email) {
                if (empty.empty(req.body.email)) {
                    let apires = api.apiresponse(true, 'email can\'t be blank', 403, null)
                    reject(apires)
                } else {
                    let apires = api.apiresponse(false, 'email is valid', 200, null)
                    resolve(apires)
                }
            } else if (empty.empty(req.body.password)) {
                let apires = api.apiresponse(true, 'password can\'t be blank', 403, null)
                reject(apires)
            } else {
                let apires = api.apiresponse(false, 'password is valid', 200, null)
                resolve(apires)
            }
        })
    }

    let register = () => {
        return new Promise((resolve, reject) => {
            console.log('register')
            signupm.findOne({ email: req.body.email })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        // logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = api.apiresponse(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    } else if (empty.empty(retrievedUserDetails)) {
                        // console.log(req.body)
                        // let password = bcrypt.hash(req.body.password, 5)
                        // let password = (empty.hashpassword(req.body.password))
                        // console.log(password)
                        let newUser = new signupm({
                            userId: randomize('Aa0', 4),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email.toLowerCase(),
                            mobileNumber: req.body.mobileNumber,
                            password: empty.hashpassword(req.body.password),
                            createdOn: Date.now()
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                console.log(err)
                                // logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = api.apiresponse(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }
                        })
                    } else {
                        // logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                        let apiResponse = api.apiresponse(true, 'User Already Present With this Email', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }
    validuser(req, res).then(register).then((resolve) => {
        delete resolve.password
        let apires = api.apiresponse(false, 'data is strored successfully', 200, resolve)
        res.send(apires)
    }).catch((err) => {
        console.log(err);
        res.send(err);
    })

}

let login = (req, res) => {
    let checkdata = () => {
        return new Promise((resolve, reject) => {
            signupm.find({ email: req.body.email }).exec((err, resultdata) => {
                if (err) {
                    let apiResponse = api.apiresponse(true, 'Failed To Create User', 500, null)
                    reject(apiResponse)
                } else if (empty.empty(req.body.password) || empty.empty(req.body.email)) {
                    let apiResponse = api.apiresponse(true, 'email/pasword is blank', 500, null)
                    reject(apiResponse)
                } else {
                    let a = api.apiresponse(false, 'email is valid', 200, resultdata)
                    resolve(a)
                }
            })
        })
    }

    let passcheck = (newUserObj) => {
        return new Promise((resolve, reject) => {
            empty.comparePassword(req.body.password, (newUserObj.data[0].password), (err, match) => {
                console.log(newUserObj.data[0].password)

                if (err) {
                    console.log(err)
                    // logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = api.apiresponse(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (match) {
                    // newUserObj = newUserObj();
                    let retrievedUserDetailsObj = newUserObj
                    console.log(newUserObj.data[0])
                    retrievedUserDetailsObj.data[0].password = undefined
                    retrievedUserDetailsObj.data[0]._id = undefined
                    retrievedUserDetailsObj.data[0].__v = undefined
                    retrievedUserDetailsObj.data[0].createdOn = undefined
                    retrievedUserDetailsObj.data[0].modifiedOn = undefined
                    resolve(retrievedUserDetailsObj)
                } else {
                    // logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = api.apiresponse(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })

    }

    let generateToken = (userDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = api.apiresponse(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    console.log(tokenDetails)
                    resolve(tokenDetails)
                }
            })
        })
    }

    let savetoken = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            signupm.find({ userId: tokenDetails.userDetails.data[0].userId }).exec((err, result) => {
                if (err) {
                    console.log(err)
                    let apiResponse = api.apiresponse(true, 'error at stage 1 of savetoken()', 500, null)
                    reject(apiResponse)
                } else if (empty.empty(result)) {
                    let tokengen = tokenDetails.userDetails.data[0]
                    let authdata = new auth({
                        userId: tokengen.userId,
                        authtoken: tokenDetails.token,
                        tokenSecrete: tokenDetails.tokensecreate,
                        tokengenerated: Date.now()
                    })

                    authdata.save((error, datastored) => {
                        if (error) {
                            console.log(error)
                            let a = api.apiresponse(true, 'error while storing user token data', 400, null)
                            reject(a)
                        } else if (empty.empty(datastored)) {
                            let a = api.apiresponse(true, 'error empty token', 403, null)
                            reject(a)

                        }
                        else {
                            let newdata = {
                                authtoken: authdata.authtoken,
                                userDetails: authdata.userId
                            }
                            let a = api.apiresponse(false, 'user token stored successfully(1st login)', 200, newdata)
                            resolve(newdata)
                        }
                    })
                } else {
                    let data = {
                        userId: tokenDetails.userDetails.data[0].userId,
                        token: tokenDetails.token,
                        // tokensecreate : tokenDetails.tokensecreate,
                        // tokengenerated : Date.now(),
                        userDetails: (tokenDetails.userDetails.data)

                    }
                    console.log(data)
                    let a = api.apiresponse(false, 'user token stored successfully(1st login)', 200, data)
                    resolve(data)

                }
            })
        })

    }

    checkdata(req, res)
        .then(passcheck)
        .then(generateToken).then(savetoken)
        .then((resolve) => {
            let apiResponse = api.apiresponse(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })

}

let logout = (req, res) => {
    auth.remove({ userId: req.user.userId })
}

let getallusers = (req, res) => {
    signupm.find().lean().exec((err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(result)
        }
    })
}



module.exports = {
    createuser: createuser,
    login: login,
    getallusers: getallusers
}