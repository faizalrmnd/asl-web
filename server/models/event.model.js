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
        type: Date,
        required: [true, 'Harap masukan tanggal event diadakan']
    },

    address: {
        type: String,
        required: [true, 'Harap masukan alamat event diadakan']
    },

    latitude: String,

    longitude: String,

    image: String
}, {
    timestamps: true
})

const Events = mongoose.model('Events', eventsSchema)

module.exports = Events