const mongoose = require('mongoose')

const merchandiseSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Harap masukan nama merchandise']
    },

    description: {
        type: String,
        required: [true, 'Harap masukan deskripsi merchandise'],
        minlength: [12, 'Masukan descripsi setidaknya sepanjang 12 karakter']
    },

    price: {
        type: Number,
        required: [true, 'Harap masukan harga merchandise'],
        min: [2000, 'Harga merchandise setidaknya Rp 2.000']
    },

    image: String
}, {
    timestamps: true
})

const Merchandise = mongoose.model('Merchandise', merchandiseSchema)

module.exports = Merchandise