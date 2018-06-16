const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Harap masukan nama service']
    },

    description: {
        type: String,
        required: [true, 'Harap masukan deskripsi service']
    },

    image: String
}, {
    timestamps: true
})

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service