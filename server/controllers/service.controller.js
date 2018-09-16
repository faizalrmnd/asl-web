const Service = require('../models/service.model')

module.exports = {
    createService (req, res, next) {        
        Service.create(req.body)
        .then(service => {
            res.status(200).json({
                message: 'Berhasil membuat service',
                service
            })
        })
        .catch(next)
    },

    updateServiceById (req, res, next) {
        let id = req.params.id

        Service.findByIdAndUpdate(id, req.body, { new: true })
        .then(service => {
            res.status(200).json({
                message: 'Berhasil mengubah data service',
                service
            })
        })
        .catch(next)
    },

    getAllService(req, res, next) {
        Service.find({})
        .then(services => {
            res.status(200).json({
                message: 'Berhasil mendapat semua service',
                services
            })
        })
        .catch(next)
    },

    getServiceById (req, res, next) {
        let id = req.params.id
        
        Service.findById(id)
        .then(service => {
            res.status(200).json({
                message: 'Berhasil mendapat data service',
                service
            })
        })
        .catch(next)
    },

    deleteServiceById (req, res, next) {
        let id = req.params.id
        
        Service.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({
                message: 'Berhasil menghapus data service'
            })
        })
        .catch(next)
    }
}