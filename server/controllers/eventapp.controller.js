const Applicant = require('../models/eventapp.model')
const nodemailer = require("nodemailer")

const user = process.env.EMAIL
const pass = process.env.PASS

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${user}`,
        pass: `${pass}`
    }
});


module.exports = {
    createApplicant (req, res, next) {
        Applicant.create(req.body)
        .then(applicant => {
          //------- node mailer disini

            Applicant.findById(applicant._id)
                .populate('Events')
                .then(newApp => {
                    let mailOptions = {
                        from: `${user}`,
                        to: `${newApp.email}`,
                        subject: 'Insert Subject Here!',
                        text: `Hello, ${newApp.name}! Anda baru saja mendaftar untuk event ${newApp.event.name}.
                                Acara akan diadakan pada tanggal ${newApp.event.date}, di ${newApp.event.place}. 
                                Mohon konfirmasi pembayaran ke ....`
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        }
                    })
                })

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