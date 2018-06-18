const mongoose = require('mongoose')

const eventsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Harap masukan nama event']
    },

    description: {
        type: String,
        required: [true, 'Harap masukan deskripsi event']
    },

    date: {
        type: String,
        required: [true, 'Harap masukan tanggal event diadakan']
    },

    place: {
        type: String,
        required: [true, 'Harap masukan tempat event diadakan']
    },

    image: String
}, {
    timestamps: true
})

const Events = mongoose.model('Events', eventsSchema)

module.exports = Events