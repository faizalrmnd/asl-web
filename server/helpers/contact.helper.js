const nodemailer = require("nodemailer")

const userMail = process.env.EMAIL
const userPass = process.env.EMAIL_PASS

const poolConfig = {
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: `${userMail}`,
        pass: `${userPass}`
    }
}

const transporter = nodemailer.createTransport(poolConfig)

// verify connection configuration
transporter.verify(function(error, success) {
    if (error) {
      console.log('Error to set up email config')
      console.log(error)
    } else {
      console.log('Server is ready to take our messages')
    }
 })

 module.exports = transporter