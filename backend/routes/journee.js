const router = require("express").Router()
const Journee = require("../models/Journee")
const {calculateNbHours, calculateTotal} = require("../services")

// add journee
router.post("/add", async (req, res) => {
    let { date, begin, end, price_hour, comission, nb_comissions, commission, recette, paied } = req.body

    // calculer le nombre d'heures
    const nbhours = calculateNbHours(begin, end)
    // calculer le total
    const totalMoney = calculateTotal(nbhours, price_hour, nb_comissions, commission)
    const newJournee = new Journee({
        date,
        begin,
        end,
        comission,
        nb_comissions,
        price_hour,
        nb_hours: nbhours,
        total: totalMoney,
        recette,
        paied
    })

    try{
       const journeeAdded = await newJournee.save()

       return res.status(201).json({
           message: 'success: journee added',
           journee: journeeAdded
       })

    } catch (e) {
        return res.status(400).send({
            message: "fail: error while adding a journee",
            error: e
        })
    }

})

router.get('/', async (req, res) => {
    const journees = await Journee.find()

    return res.status(200).json({
        journees: journees
    })
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const journeePaiedChanged = await Journee.updateOne({_id: id}, [ { $set: { paied: { $not: "$paied" } } } ])
    if (journeePaiedChanged) {
        return res.status(200).json({
            message: "success: journee paied field updated",
        })
    }
})

module.exports = router