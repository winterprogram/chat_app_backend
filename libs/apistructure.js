let apiresponse = (err, message, status, data) => {
    let api = {
        err: err,
        message: message,
        status: status,
        data: data
    }
    return api;
}

module.exports = {
    apiresponse: apiresponse
}