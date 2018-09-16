const mongoose = require('mongoose')

const aboutSchema = mongoose.Schema({
    template: {
        type: String,
        required: [true, 'Tolong masukan template untuk halaman about']
    }
}, {
    timestamps: true
})

const About = mongoose.model('About', aboutSchema)

module.exports = About