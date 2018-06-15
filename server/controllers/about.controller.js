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

    updateAboutById (req, res, next) {
        let id = req.params.id

        About.findByIdAndUpdate(id, req.body, { new: true })
        .then(about => {
            res.status(200).json({
                message: 'Berhasil mengubah data about',
                about
            })
        })
        .catch(next)
    },

    getAllAbout(req, res, next) {
        About.find({})
        .then(abouts => {
            res.status(200).json({
                message: 'Berhasil mendapat semua about',
                abouts
            })
        })
        .catch(next)
    },

    getAboutById (req, res, next) {
        let id = req.params.id
        
        About.findById(id)
        .then(about => {
            res.status(200).json({
                message: 'Berhasil mendapat data about',
                about
            })
        })
        .catch(next)
    },

    deleteAboutById (req, res, next) {
        let id = req.params.id
        
        About.findById(id)
        .then(() => {
            res.status(200).json({
                message: 'Berhasil menghapus data about'
            })
        })
        .catch(next)
    }
}