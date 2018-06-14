const Merchandise = require('../models/Merchandise.model')

module.exports = {
    createMerchandise (req, res, next) {        
        Merchandise.create(req.body)
        .then(merchandise => {
            res.status(200).json({
                message: 'Berhasil membuat merchandise',
                merchandise
            })
        })
        .catch(next)
    },

    updateMerchandiseById (req, res, next) {
        let id = req.params.id

        Merchandise.findByIdAndUpdate(id, req.body, { new: true })
        .then(merchandise => {
            res.status(200).json({
                message: 'Berhasil mengubah data merchandise',
                merchandise
            })
        })
        .catch(next)
    },

    getAllMerchandise(req, res, next) {
        Merchandise.find({})
        .then(merchandises => {
            res.status(200).json({
                message: 'Berhasil mendapat semua merchandise',
                merchandises
            })
        })
        .catch(next)
    },

    getMerchandiseById (req, res, next) {
        let id = req.params.id
        
        Merchandise.findById(id)
        .then(merchandise => {
            res.status(200).json({
                message: 'Berhasil mendapat data merchandise',
                merchandise
            })
        })
        .catch(next)
    },

    deleteMerchandiseById (req, res, next) {
        let id = req.params.id
        
        Merchandise.findById(id)
        .then(() => {
            res.status(200).json({
                message: 'Berhasil menghapus data merchandise'
            })
        })
        .catch(next)
    }
}