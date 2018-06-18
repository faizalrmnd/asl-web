const mongoose = require('mongoose')

const testimonySchema = mongoose.Schema({
    testimoner: {
        type: String,
        required: [true, 'Harap masukan nama testimoner']
    },

    testimony: {
        type: String,
        required: [true, 'Harap masukan testimony'],
        minlength: [32, 'Masukan testimoni setidaknya sepanjang 32 karakter']
    },

    from: {
        type: String,
        required: [true, 'Harap masukan asal testimoner']
    },
    
    image: String
}, {
    timestamps: true
})

const Testimony = mongoose.model('Testimony', testimonySchema)

module.exports = Testimony