const jwt = require("jsonwebtoken");
const Journee = require("./models/Journee");

exports.checkAdminAuth = (req, res, next) => {
    const token = jwt.verify()
    if (token) {
        next()
    }
    return res.status(401).json({
        message: "Unauthorized",
    })
}


exports.calculateNbHours = (begin, end) => {
    const _begin = new Date(begin)
    const _end = new Date(end)
    const diffrenceMs = _end - _begin
    const hours = diffrenceMs / (1000*60*60)
    console.log(hours)
    return Math.abs(hours)
}

exports.calculateTotal = (nbhours, price_hour, nbcomissions, comission) => {
    console.log(typeof nbhours, typeof price_hour, typeof nbcomissions, typeof comission)
    const total = nbhours*price_hour+nbcomissions*comission
    console.log(total)
    return total
}