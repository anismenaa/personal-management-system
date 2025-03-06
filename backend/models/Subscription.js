const mongoose = require('mongoose')



const subscriptionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String
    },
    prelevDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
})

const subscriptionModel = mongoose.model('Subscription', subscriptionSchema)

module.exports = subscriptionModel