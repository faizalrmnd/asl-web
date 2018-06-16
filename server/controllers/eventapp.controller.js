const Applicant = require('../models/eventapp.model')

module.exports = {
    createApplicant (req, res, next) {
        Applicant.create({
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
          eventId: req.body.eventId
        })
        .then(applicant => {
          //perlu node mailer disini
            res.status(200).json({
                message: 'Berhasil membuat applicant',
                applicant
            })
        })
        .catch(next)
    },

    getAllApplicant(req, res, next) {
        Applicant.find({})
        .then(applicants => {
            res.status(200).json({
                message: 'Berhasil mendapat semua applicant',
                applicants
            })
        })
        .catch(next)
    },

    getApplicantById (req, res, next) {
        let id = req.params.id
        
        Applicant.findById(id)
        .then(applicant => {
            res.status(200).json({
                message: 'Berhasil mendapat data applicant',
                applicant
            })
        })
        .catch(next)
    },

    deleteApplicantById (req, res, next) {
        let id = req.params.id
        
        Applicant.findById(id)
        .then(() => {
            res.status(200).json({
                message: 'Berhasil menghapus data applicant'
            })
        })
        .catch(next)
    }
}