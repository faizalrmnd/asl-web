const Image = require('../models/image.model')
const { deleteFileFromGCS } = require('../helpers/image.helper')

module.exports = {
    uploadNewPicture (req, res, next) {
        let name = req.file.originalname
        let url = req.file.cloudStoragePublicUrl

        let new_image = {name, url}
        Image.create(new_image)
        .then(image => {
            res.status(200).json({
                message: 'Berhasil upload gambar',
                image
            })
        })
        .catch(next)
    },

    async deleteImage (req, res, next) {
        try {
            let id = req.params.id
            let image = await Image.findById(id)
            await deleteFileFromGCS(image.name)
            await Image.findByIdAndRemove(id)

            res.status(200).send('Berhasil hapus gambar')
        } catch(err){
            next(err)
        }
    }
}
