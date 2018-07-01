const Events = require('../models/event.model')

module.exports = {
    createEvents (req, res, next) {        
        Events.create(req.body)
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

        Events.findByIdAndUpdate(id, req.body, { new: true })
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
        .sort({date: -1})
        .then(events => {
            res.status(200).json({
                message: 'Berhasil mendapat semua events',
                events
            })
        })
        .catch(next)
    },

    getEventsById (req, res, next) {
        let id = req.params.id
        
        Events.findById(id)
        .then(event => {
            res.status(200).json({
                message: 'Berhasil mendapat data event',
                event
            })
        })
        .catch(next)
    },

    deleteEventsById (req, res, next) {
        let id = req.params.id
        
        Events.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({
                message: 'Berhasil menghapus data event'
            })
        })
        .catch(next)
    }
}