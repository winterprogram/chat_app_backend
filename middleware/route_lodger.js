const app = require('./../config/appConfig')

let routelodger = (req, res, next) => {
    let remortip = req.connection.remoteAddress + '://' + req.connection.remotePort;
    // console.log(req.remortePort)
    let realip = req.headers['X-REAL-IP']

    console.log(req.method + " Request made from " + remortip + " from port " + req.originalUrl)

    if (req.method == 'OPTIONS') {
        var headers = {};
        headers["Access-Control-Allow-Origin"] = "*",
            headers["Access-Control-Allow-Meathods"] = "GET, POST, PUT, DELETE, OPTIONS",
            headers["Access-Control-Allow-Credentials"] = false,
            headers["Access-Control-Allow-Age"] = '86400',
            headers["Access-Control-Allow-Headers"] = "X-Requested-Width, X-HTTP-Method-Override, Content-Type, Accept",
            res.writeHead(200, headers);
        res.end()
    } else {
        res.header("Access-Control-Allow-Origin", app.allowedCorsOrogin),
            res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS"),
            res.header("Access-Control-Allow-Headers", "X-Requested-Width, X-HTTP-Method-Override, Content-Type, Accept")
        next();
    }
}

module.exports = {
    routelodger: routelodger

}