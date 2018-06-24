const Applicant = require('../models/eventapplicant.model')
const nodemailer = require("nodemailer")

const user = process.env.EMAIL
const pass = process.env.EMAIL_PASS

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${user}`,
        pass: `${pass}`
    }
});

module.exports = {
    async createApplicant (req, res, next) {
        try {

            let applicant = await Applicant.create(req.body)
            let newApp = await applicant.populate({path: 'event'}).execPopulate()

            let mailOptions = {
                from: `${user}`,
                to: `${newApp.email}`,
                subject: `Pendaftaran  ${newApp.event.name} berhasil`,
                text: `Hello, ${newApp.name}! Anda baru saja mendaftar untuk event ${newApp.event.name}.
                        Acara akan diadakan pada tanggal ${newApp.event.date}, di ${newApp.event.place}. 
                        Mohon konfirmasi pembayaran ke ....`
            }

            await transporter.sendMail(mailOptions)

            res.status(200).json({
                message: 'Berhasil mendaftar applicant',
                newApp
            })

        } catch (err) {
            next(err)
        }
        
    },

    getAllApplicant(req, res, next) {
        Applicant.find({})
        .populate('event')
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
        .populate('event')
        .then(applicant => {
            res.status(200).json({
                message: 'Berhasil mendapat data applicant',
                applicant
            })
        })
        .catch(next)
    },

    getApplicantsByEventId (req, res, next) {
        let eventId = req.params.id
        
        Applicant.find({event: eventId})
        .populate('event')
        .then(applicants => {
            res.status(200).json({
                message: 'Berhasil mendapat data applicant',
                applicants
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