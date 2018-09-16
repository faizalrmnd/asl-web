const mongoose = require('mongoose')

const merchandiseSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Harap masukan nama merchandise']
    },

    description: {
        type: String,
        required: [true, 'Harap masukan deskripsi merchandise']
    },

    price: {
        type: Number,
        required: [true, 'Harap masukan harga merchandise']
    },

    image: String
}, {
    timestamps: true
})

const Merchandise = mongoose.model('Merchandise', merchandiseSchema)

module.exports = Merchandise