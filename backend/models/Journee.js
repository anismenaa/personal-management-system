const mongoose = require('mongoose')

const journeeSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    begin: {
        type: Date,
        required: true,
    },

    end: {
        type: Date,
        required: true,
    },

    nb_hours: {
        type: Number,
        required: true,
    },

    price_hour: {
        type: Number,
        required: true,
    },
    commission: {
        type: Number,
        default: 20,
        required: true,
    },
    nb_comissions: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    recette: {
        type: Number
    },
    paied: {
        type: Boolean,
        required: true,
    }

})

const journeeModel = mongoose.model('Journee', journeeSchema)

module.exports = journeeModel