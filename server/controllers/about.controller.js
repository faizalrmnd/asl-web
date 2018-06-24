const About = require('../models/about.model')

module.exports = {
    async createUpdateAbout (req, res, next) {
        try {
            let about = await About.findOne({}, req.body, { new: true })

            if(!about || about.length < 1){
                console.log('masuk create')                
                about = await About.create(req.body)
            } else {
                console.log('masuk update')
                about = await About.findOneAndUpdate({}, req.body, { new: true })
            }

            res.status(200).json({
                message: 'Berhasil mengubah data about',
                about
            })
        } catch (error) {
            next(error)
        }
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