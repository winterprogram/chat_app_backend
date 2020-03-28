const mongodb = require('mongodb')

let empty = (x) => {
    if (x == undefined || x == null || x == '') {
        console.log(`${x} is empty`)
        return true;
    } else {
        return false;
    }

}

let validemail = (x) => {
    let email = /[a-zA-z]+(\.?\w)+@+[a-zA-z]+\.+[a-z]+/;
    if (x === (email)) {
        return x
    } else {
        return false;
    }
}

let pass = (x) => {
    let p = /^[A-Za-z0-9]\w{7,}$/
    if (x.match(p)) {
        return x
    }
    else {
        return false
    }
}
const bcrypt = require('bcrypt')
const saltRounds = 10

/* Custom Library */
// let logger = require('../libs/loggerLib')

let hashpassword = (myPlaintextPassword) => {
    let salt = bcrypt.genSaltSync(saltRounds)
    let hash = bcrypt.hashSync(myPlaintextPassword, salt)
    return hash
}
let comparePassword = (oldPassword, hashpassword, cb) => {
    bcrypt.compare(oldPassword, hashpassword, (err, res) => {
        if (err) {
            // logger.error(err.message, 'Comparison Error', 5)
            cb(err, null)
        } else {
            cb(null, res)
        }
    })
}

let comparePasswordSync = (myPlaintextPassword, hash) => {
    return bcrypt.compareSync(myPlaintextPassword, hash)
}



module.exports = {
    empty: empty,
    pass: pass,
    validemail: validemail,
    hashpassword: hashpassword,
    comparePassword: comparePassword,
    comparePasswordSync: comparePasswordSync
}