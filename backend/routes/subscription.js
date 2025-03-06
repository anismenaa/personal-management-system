const router = require('express').Router()
const Subscription = require('../models/Subscription')

// adding a subscription
router.post('/add', (req, res) => {
    const { title, description, price, prelevDate, active} = req.body

    const newSubscription = new Subscription({
        title,
        description,
        price,
        prelevDate,
        active
    })

    // now we try to save it into the database
    console.log("new subscription : ", newSubscription)
        newSubscription.save()
            .then(subscription => {
                    console.log(subscription)
                    return res.status(201).send({
                        message: "success: subscription added successfully",
                        subscription : subscription
                    })

            })
            .catch(err => {
                return res.status(400).send({
                    message: `fail: err`
                })
            })



})

// get all the subs
router.get('/', async (req, res) => {
    const subscriptions = await Subscription.find()

    // calculer le total
    let total = 0
    subscriptions.forEach(subscription => {
        total += subscription.price
    })
    res.status(200).send({
        subscriptions : subscriptions,
        total: total
    })
})


module.exports = router