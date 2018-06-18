const mongoose = require('mongoose')

const eventAppSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Tolong masukan user/penulis untuk contact']
    },
    email: {
      type: String,
      required: [true, 'Tolong masukan email user/penulis untuk contact']
    },
    phone: {
      type: Number,
      required: [true, 'Tolong nomer user/penulis untuk contact']
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Events'
    }
}, {
    timestamps: true
})

const EventApp = mongoose.model('EventApp', eventAppSchema)

module.exports = EventApp