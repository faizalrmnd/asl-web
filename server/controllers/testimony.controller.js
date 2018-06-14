const Testimony = require('../models/testimony.model')

module.exports = {
    createTestimony (req, res, next) {
        Testimony.create(req.body)
        .then(testimony => {
            res.status(200).json({
                message: 'Berhasil membuat testimony',
                testimony
            })
        })
        .catch(next)
    },

    updateTestimonyById (req, res, next) {
        let id = req.params.id

        Testimony.findByIdAndUpdate(id, req.body, { new: true })
        .then(testimony => {
            res.status(200).json({
                message: 'Berhasil mengubah data testimony',
                testimony
            })
        })
        .catch(next)
    },

    getAllTesimony (req, res, next) {
        Testimony.find({})
        .then(testimonies => {
            res.status(200).json({
                message: 'Berhasil mendapat semua testimony',
                testimonies
            })
        })
        .catch(next)
    },

    getTestimonyById (req, res, next) {
        let id = req.params.id
        
        Testimony.findById(id)
        .then(testimony => {
            res.status(200).json({
                message: 'Berhasil mendapat data testimony',
                testimony
            })
        })
        .catch(next)
    },

    deleteTestimonyById (req, res, next) {
        let id = req.params.id
        
        Testimony.findById(id)
        .then(() => {
            res.status(200).json({
                message: 'Berhasil menghapus data testimony'
            })
        })
        .catch(next)
    }
}