const router = require('express').Router()
const Sub = require('../models/Subscription')
const Journee = require('../models/Journee')

router.get('/titles', async (req, res)=>{
    const titles = await Sub.find({}, 'title prelevDate -_id').sort({prelevDate: 1})
    return res.status(200).json({
      titles: titles
    })

})

// this function get the total of journee paied of the current month
router.get('/totalpermonth/:month', async (req, res) => {
    const currentMonth = req.params.month
    console.log(currentMonth)
    const journees = await Journee.find()
    let total = 0
    journees.forEach(journe => {
        const date = new Date(journe.date)
        if (date.getMonth() == currentMonth && journe.paied) {
            total += journe.total
        }
    })

    return res.status(200).json({
        totalpermonth: total
    })
})


module.exports = router