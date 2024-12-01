const express = require('express')
const app = express()
const port = 3000 
const web = require('./routing/web')
const connectDb = require('./db/connectDb')
var cookieParser = require('cookie-parser')
app.use(cookieParser())

//image upload
const fileUpload = require('express-fileupload')

//ejs a.ejs
app.set('view engine', 'ejs')

connectDb()
// css image link
app.use(express.static('public'))
//image upload
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir:'/tmp/',
}));

//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

//connect flash and sessions
const session = require('express-session')
const flash = require('connect-flash');
//messages
app.use
(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }));
//Flash messages
app.use(flash());



//localhost:3000
//routing
app.use('/',web)


//server run
app.listen(port,console.log("server start localhost:3000"))


// terminal par load kar na hi

// npm i init
// npm i express
// npm i ejs
// npm i mongoose
// npm i bcrypt
// npm i connect-flash
// npm i express-session
// npm i express-fileupload
// npm i cloudinary  
//npm i jsonwebtoken
// npm i cookie-parser
// npm i nodemailer