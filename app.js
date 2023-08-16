const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const port = 5050
const ip = '127.0.0.1'

app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: true,
}))

dotenv.config({ path: './config.env' })

const mongoose = require('mongoose')

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', () => {
    console.log('連接數據庫失敗');
})

db.once('open', () => {
    console.log('MONGODB 已連接...');
})

app.set('view engine', 'hbs')

app.use(express.static('public'))

app.use('/auth', express.static('public'))

app.use('/', require('./routes/pages'))

app.use('/auth', require('./routes/auth'))

app.listen(port, ip, () => {
    console.log(`服務器運行在 http://${ip}:${port}`);
})
