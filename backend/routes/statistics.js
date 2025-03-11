const router = require('express').Router()
const Sub = require('../models/Subscription')
const Journee = require('../models/Journee')

router.get('/titles', async (req, res)=>{
    const titles = await Sub.find({}, 'title prelevDate total -_id').sort({prelevDate: 1})
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

// this function get the total of journee impaied of the current month
router.get('/restpermonth/:month', async (req, res) => {
    const currentMonth = req.params.month
    console.log(currentMonth)
    const journees = await Journee.find()
    let total = 0
    journees.forEach(journe => {
        const date = new Date(journe.date)
        if (date.getMonth() == currentMonth && !journe.paied) {
            total += journe.total
        }
    })

    return res.status(200).json({
        restpermonth: total
    })
})


router.get('/depenses/:month', async (req, res) => {
    const today = new Date();
    const monthParam = parseInt(req.params.month) || today.getMonth() + 1; // Default to current month if not provided
    const yearParam = today.getFullYear(); // Default to current year if not provided

    // Start of the month at 00:00:00
    const startOfMonth = new Date(yearParam, monthParam, 1);
    // End of today at 23:59:59
    const endOfToday = new Date(yearParam, monthParam, today.getDate(), 23, 59, 59);

    try {
        const NowDep = await Sub.aggregate([
            {
                $match: {
                    prelevDate: {
                        $gte: startOfMonth,
                        $lte: endOfToday
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$price' }
                }
            }
        ]);

        const TotalDep = await Sub.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$price' }
                }
            }
        ])

        if (NowDep.length > 0) {
            return res.json({ totalAmount: NowDep[0].totalAmount, total: TotalDep[0].totalAmount });
        } else {
            return res.json({ totalAmount: 0, total: TotalDep[0].totalAmount  });  // Handle case where no documents match
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error retrieving total amount', error });
    }
})

module.exports = router