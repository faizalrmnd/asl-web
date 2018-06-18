const Image = require('../models/image.model')

module.exports = {
    sendPictureUrl (req, res, next) {
        let url = req.file.cloudStoragePublicUrl

        res.status(200).send(url)
    }
}
