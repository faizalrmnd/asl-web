const About = require('../models/about.model')

module.exports = {
    createAbout (req, res, next) {        
        About.create(req.body)
        .then(about => {
            res.status(200).json({
                message: 'Berhasil membuat about',
                about
            })
        })
        .catch(next)
    },

    updateAbout (req, res, next) {
        About.findOneAndUpdate({}, req.body, { new: true })
        .then(about => {
            res.status(200).json({
                message: 'Berhasil mengubah data about',
                about
            })
        })
        .catch(next)
    },

    getAbout (req, res, next) {        
        About.findOne({})
        .then(about => {
            res.status(200).json({
                message: 'Berhasil mendapat data about',
                about
            })
        })
        .catch(next)
    }
}