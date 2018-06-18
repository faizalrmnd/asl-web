const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user: {
      type: String
    },
    email: {
      type: String,
      required: [true, 'Tolong masukan email user/penulis untuk contact']
    },
    phone: {
      type: Number
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