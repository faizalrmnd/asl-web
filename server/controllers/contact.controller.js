const Contact = require('../models/contact.model')
const transporter = require('../helpers/contact.helper')

const userEmail = process.env.EMAIL

module.exports = {
    createContact (req, res, next) {
        req.body.isResponded = false

        Contact.create(req.body)
        .then(contact => {
            res.status(200).json({
                message: 'Berhasil membuat contact',
                contact
            })
        })
        .catch(next)
    },

    async respondContactById (req, res, next) {
        try {
            let id = req.params.id

            let contact = await Contact.findByIdAndUpdate(id, {isResponded: true}, { new: true })

            let mailOptions = {
                from: `${userEmail}`,
                to: `${contact.email}`,
                subject: req.body.subject,
                text: req.body.message
                }

                await transporter.sendMail(mailOptions)

                res.status(200).json({
                    message: 'Berhasil membalas email',
                    contact
                })

        } catch(error) {
            next(error)
        }      
  },

    getAllContact(req, res, next) {
        Contact.find({isResponded: false})
        .then(contacts => {
            res.status(200).json({
                message: 'Berhasil mendapat semua contact',
                contacts
            })
        })
        .catch(next)
    },

    getContactById (req, res, next) {
        let id = req.params.id
        
        Contact.findById(id)
        .then(contact => {
            res.status(200).json({
                message: 'Berhasil mendapat data contact',
                contact
            })
        })
        .catch(next)
    },

    deleteContactById (req, res, next) {
        let id = req.params.id
        
        Contact.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({
                message: 'Berhasil menghapus data contact'
            })
        })
        .catch(next)
    }
}