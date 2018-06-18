const mongoose = require('mongoose')

const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const contactSchema = mongoose.Schema({
    user: {
      type: String
    },
    email: {
      type: String,
      required: [true, 'Tolong masukan email user/penulis untuk contact'],
      match: [email_regex, 'Masukan email dengan format yang benar']
    },
    phone: {
      type: String
    },
    content: {
      type: String,
      required: [true, 'Tolong masukan content untuk contact']
    },
    isResponded: {
      type: Boolean,
      required: [true, 'Tolong boolean untuk menandakan respon']
    }
}, {
    timestamps: true
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact