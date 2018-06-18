const mongoose = require('mongoose')

const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const eventAppSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Tolong masukan user/penulis untuk contact']
    },
    email: {
      type: String,
      required: [true, 'Tolong masukan email user/penulis untuk contact'],
      match: [email_regex, 'Masukan email dengan format yang benar']
    },
    phone: {
      type: String,
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