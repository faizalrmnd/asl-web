const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Harap masukan nama gambar']
    },

    url: {
        type: String
    }
}, {
    timestamps: true
})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image