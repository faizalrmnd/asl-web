const Article = require('../models/article.model')

module.exports = {
    createArticle (req, res, next) {
        let { id } = req.decoded
        req.body.author = id
                
        Article.create(req.body)
        .then(article => {
            res.status(200).json({
                message: 'Berhasil membuat article',
                article
            })
        })
        .catch(next)
    },

    updateArticleById (req, res, next) {
        let id = req.params.id

        Article.findByIdAndUpdate(id, req.body, { new: true })
        .then(article => {
            res.status(200).json({
                message: 'Berhasil mengubah data article',
                article
            })
        })
        .catch(next)
    },

    getAllArticle(req, res, next) {
        Article.find({})
        .sort({createdAt : -1})
        .populate('author', 'name email')
        .then(articles => {
            res.status(200).json({
                message: 'Berhasil mendapat semua article',
                articles
            })
        })
        .catch(next)
    },

    getArticleById (req, res, next) {        
        let id = req.params.id
        
        Article.findById(id)
        .populate('author', 'name email')
        .then(article => {            
            res.status(200).json({
                message: 'Berhasil mendapat data article',
                article
            })
        })
        .catch(next)
    },

    deleteArticleById (req, res, next) {
        let id = req.params.id
        
        Article.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({
                message: 'Berhasil menghapus data article'
            })
        })
        .catch(next)
    }
}