const express = require('express')
const handlebars = require('express-handlebars')

const { connectDb } = require('./config/config')
const routerApp = require('./routes')
const { initializePassport } = require('./config/passportJwt')
const passport = require('passport')
const cookieParser = require('cookie-parser')

const app = express()
const PORT = 8080

connectDb()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser('firmaSecret@'))

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

initializePassport()
app.use(passport.initialize())

app.use(routerApp)

app.listen(PORT, ()=>{
    console.log(`Server listen on port ${PORT}`)
})