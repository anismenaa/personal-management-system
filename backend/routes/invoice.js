const router = require("express").Router()
const Journee = require("../models/Journee")

router.get('/getJournees', async (req, res) => {
    const { beginDate, endDate } = req.query

    // now we will return all the unpaied journees that are between begindate and endDate
    const journeesUnpaied = await Journee.find().where('paied').equals('false').where('date').gte(beginDate).lte(endDate)

    // calculate the total of the unpaied
    let totalImpaied = 0
    journeesUnpaied.forEach(journe => {
        totalImpaied += journe.total
    })

    return res.status(200).json({
        journeesUnpaied: journeesUnpaied,
        totalUnpaied: totalImpaied,
    })
})

module.exports = router