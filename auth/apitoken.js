const response = require('./../libs/response_structure')
let apiToken = (req, res, next) => {
    if (req.body.authtoken || req.params.authtoken || req.query.authtoken) {
        if (req.body.authtoken == 'Admin' || req.params.authtoken == 'Admin' || req.query.authtoken == 'Admin') {
            console.log('success')
            next();

        } else {
            let response = response.apiresponse(true, 'Token is not coorect/valid', 500, null)
            res.send(response)
        }
    } else {
        let response = response.apiresponse(true, 'Token not present', 404, null)
        res.send(response)

    }
}

module.exports = {
    apiToken: apiToken
}