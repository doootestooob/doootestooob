const express = require('express')
const authcontroller = require('../controllers/auth')
const router = express.Router();//使用分區路由不再是全局路由，使它模塊化更好管理與維護
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });



router.post('/register', authcontroller.register)

router.post('/login', authcontroller.login)

router.get('/logout', authcontroller.logout)

router.get('/personalinternation', authcontroller.personalinternation)

router.post('/location', authcontroller.location)

router.get('/goorder', authcontroller.goorder)

router.post('/buymeals', authcontroller.buymeals)

router.post('/uploadimg', upload.single('image'), authcontroller.uploadimg)




module.exports = router; //導出路由模塊以供應其他路由使用