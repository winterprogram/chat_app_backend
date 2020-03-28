let initalerror = (err, req, res, next) => {
    console.log('some error has occured')
    console.log(err)
    res.send('some error has occured')
}


let routeserror = (err, req, res, next) => {
    // console.log('some error has occured')
    console.log(err)
    res.status(404).send('route not found')
}

module.exports = {
    initalerror: initalerror,
    routeserror: routeserror
}