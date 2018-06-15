const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    template: {
        type: String,
        required: [true, 'Tolong masukan template untuk artikel']
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article