require('dotenv').config()

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const testimonyRouter = require('./routes/testimony')
const merchandiseRouter = require('./routes/merchandise')
const imageRouter = require('./routes/image')
const articleRouter = require('./routes/article')
const aboutRouter = require('./routes/about')

const serviceRouter = require('./routes/service')
const eventRouter = require('./routes/event')
const eventAppRouter = require('./routes/eventapplicant')
const contactRouter = require('./routes/contact')

// mongoose.connect('mongodb://localhost/asl')
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@asl-cluster-ysqxo.gcp.mongodb.net/test?retryWrites=true&w=majority`)

// test DB connection
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connect succesfully to DB')
});

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// cors masih kebuka di semua koneksi, nanti di config
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/testimony', testimonyRouter)
app.use('/merchandise', merchandiseRouter)
app.use('/image', imageRouter)
app.use('/article', articleRouter)
app.use('/service', serviceRouter)
app.use('/event', eventRouter)
app.use('/applicant', eventAppRouter)
app.use('/contact', contactRouter)
app.use('/about', aboutRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
// error handler masih butuh di rubah
// buat handle error message lebih rapih
app.use(function(err, req, res, next) {
  console.log(err)

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500).send(err.message)
  // res.render('error')
})

module.exports = app
