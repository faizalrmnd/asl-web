const Contact = require('../models/contact.model')

module.exports = {
    createContact (req, res, next) {        
        Contact.create({
          user: req.body.user,
          email: req.body.email,
          phone: req.body.number,
          content: req.body.content,
          isResponded: false
        })
        .then(contact => {
            res.status(200).json({
                message: 'Berhasil membuat about',
                contact
            })
        })
        .catch(next)
    },

    respondContactById (req, res, next) {
      let id = req.params.id

      Contact.findByIdAndUpdate(id, {
        isResponded: true
      }, { new: true })
      .then(article => {
          res.status(200).json({
              message: 'Berhasil mengubah data article',
              article
          })
      })
      .catch(next)
  },

    getAllContact(req, res, next) {
        Contact.find({})
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
        
        Contact.findById(id)
        .then(() => {
            res.status(200).json({
                message: 'Berhasil menghapus data contact'
            })
        })
        .catch(next)
    }
}