const express = require('express');


let appConfig = {}

appConfig.port = 3000;
appConfig.allowedCorsOrogin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri: "mongodb://127.0.0.1:27017/chatdb"
}

appConfig.version = "v1";

module.exports = {
    port: appConfig.port,
    allowedCorsOrogin: appConfig.allowedCorsOrogin,
    env: appConfig.env,
    db: appConfig.db,
    version: appConfig.version
}
