const Events = require('../models/event.model')

module.exports = {
    createEvents (req, res, next) {        
        Events.create({
            name: req.body.name,
            description: req.body.description,
            image: req.file.cloudStoragePublicUrl
        })
        .then(event => {
            res.status(200).json({
                message: 'Berhasil membuat event',
                event
            })
        })
        .catch(next)
    },

    updateEventsById (req, res, next) {
        let id = req.params.id

        Events.findByIdAndUpdate(id, {
            name: req.body.name,
            description: req.body.description,
            image: req.file.cloudStoragePublicUrl
        }, { new: true })
        .then(event => {
            res.status(200).json({
                message: 'Berhasil mengubah data event',
                event
            })
        })
        .catch(next)
    },

    getAllEvents(req, res, next) {
        Events.find({})
        .then(service => {
            res.status(200).json({
                message: 'Berhasil mendapat semua service',
                service
            })
        })
        .catch(next)
    },

    getEventsById (req, res, next) {
        let id = req.params.id
        
        Events.findById(id)
        .then(service => {
            res.status(200).json({
                message: 'Berhasil mendapat data service',
                service
            })
        })
        .catch(next)
    },

    deleteEventsById (req, res, next) {
        let id = req.params.id
        
        Events.findById(id)
        .then(() => {
            res.status(200).json({
                message: 'Berhasil menghapus data event'
            })
        })
        .catch(next)
    }
}