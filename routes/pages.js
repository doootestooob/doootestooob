const express = require('express')

const authcontroller = require('../controllers/auth')
const session = require('express-session');
const router = express.Router(); //使用分區路由不再是全局路由，使它模塊化更好管理與維護

const dotenv = require('dotenv') //使用dotenv讓變數保存在後端而不是程式碼內，使資料更安全
dotenv.config({ path: '../a.env' }) //config可引入env檔

const mysql = require('mysql')
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    databasePort: process.env.DATABASE_PORT
})


router.get('/', (req, res) => {
    res.render('index')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login')
})

const checkEmailAccount = (req, res, next) => {

    const hasEmailAccount = req.session.passwordAccount && req.session.emailAccount;

    if (!hasEmailAccount) {
        return res.redirect('/');
    }
    next();
};

router.get('/admin', checkEmailAccount, (req, res) => {
    const recordname = req.session.reqname;
    const recordemail = req.session.emailAccount;
    const recordpassword = req.session.passwordAccount;
    res.render('admin', { recordname, recordemail, recordpassword })
})

router.get('/chat', checkEmailAccount, (req, res) => {
    const recordname = req.session.reqname;
    const recordemail = req.session.emailAccount;
    const recordpassword = req.session.passwordAccount;
    const recordhomelocation = req.session.reqhomelocation;
    const recordbuytimes = req.session.reqbuytimes;
    const recordfilename = req.session.reqfilename;

    res.render('chat', { recordname, recordemail, recordpassword, recordhomelocation, recordbuytimes, recordfilename })
})

router.get('/adminchat', checkEmailAccount, (req, res) => {
    const recordname = req.session.reqname;
    const recordemail = req.session.emailAccount;
    const recordpassword = req.session.passwordAccount;
    const recordhomelocation = req.session.reqhomelocation;
    const recordbuytimes = req.session.reqbuytimes;
    const recordfilename = req.session.reqfilename;
    db.query('SELECT email FROM users', (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('服務器錯誤');
        }
        const selectroomDiv = results.map((result, index) => {
            
            return `<option value=${result.email}>${result.email}</option>`
        })

        const selectroomAll = selectroomDiv.join('');
        res.render('adminchat', { recordname, recordemail, recordpassword, recordhomelocation, recordbuytimes, recordfilename, selectroomAll })
    })
})

router.get('/mymail', checkEmailAccount, (req, res) => {
    const recordname = req.session.reqname;
    const recordemail = req.session.emailAccount;
    const recordpassword = req.session.passwordAccount;
    const recordhomelocation = req.session.reqhomelocation;
    const recordbuytimes = req.session.reqbuytimes;
    const recordfilename = req.session.reqfilename;

    db.query('SELECT * FROM usermail WHERE email = ?', [recordemail], async (error, results) => {
        if (error) {

            console.error(error);
            return res.status(500).send('服務器錯誤');
        }

        const divElements = results.map((result, index) => {
            return `<div class="mail">
                        <div class="mailtitle">訊息${index + 1}：${result.title}</div>
                        <div class="mailcontent">內容：${result.content}</div>
                        <div class="mailtime">${result.mailtime}</div>
                    </div>`;
        });

        const recordmail = divElements.join('');

        res.render('mymail', { recordname, recordemail, recordpassword, recordhomelocation, recordbuytimes, recordfilename, recordmail });
    })


});


router.get('/loginsuccess', checkEmailAccount, (req, res) => {
    const recordname = req.session.reqname;
    const recordemail = req.session.emailAccount;
    const recordpassword = req.session.passwordAccount;
    const recordhomelocation = req.session.reqhomelocation;
    const recordbuytimes = req.session.reqbuytimes;
    const recordfilename = req.session.reqfilename;
    res.render('loginsuccess', { recordname, recordemail, recordpassword, recordbuytimes, recordfilename, recordhomelocation })
})

router.get('/personalinternation', checkEmailAccount, (req, res) => {
    const recordname = req.session.reqname;
    const recordemail = req.session.emailAccount;
    const recordpassword = req.session.passwordAccount;
    const recordhomelocation = req.session.reqhomelocation;
    const recordbuytimes = req.session.reqbuytimes;
    const recordfilename = req.session.reqfilename;

    const recordalert = req.session.reqalert;
    res.render('personalinternation', { recordname, recordemail, recordpassword, recordbuytimes, recordfilename, recordhomelocation, recordalert })
})


router.get('/goorder', checkEmailAccount, (req, res) => {
    const recordname = req.session.reqname;
    const recordemail = req.session.emailAccount;
    const recordpassword = req.session.passwordAccount;
    const recordhomelocation = req.session.reqhomelocation;
    const recordbuytimes = req.session.reqbuytimes;
    const recordfilename = req.session.reqfilename;

    const recordfries = req.session.reqfries
    const recordinputtime = req.session.reqinputtime
    const recordfinishstate = req.session.reqfinishstate
    const recordprice = req.session.reqprice
    const recordsmokeburger = req.session.reqsmokeburger
    const recordbeefburger = req.session.reqbeefburger
    const recordpizza = req.session.reqpizza
    const recordapplepie = req.session.reqapplepie
    const recordmomo = req.session.reqmomo

    const recordalert = req.session.reqalert;
    const recordalreadyorder = req.session.alreadyorder;

    if (recordfinishstate == 1) {
        res.render('goorder', { recordname, recordemail, recordpassword, recordbuytimes, recordfilename, recordhomelocation, recordalert, recordfries, recordinputtime, recordfinishstate, recordprice, recordsmokeburger, recordbeefburger, recordpizza, recordapplepie, recordmomo })
    } else {
        res.render('goorder', { recordname, recordemail, recordpassword, recordbuytimes, recordfilename, recordhomelocation, recordalert, recordfries, recordinputtime, recordfinishstate, recordprice, recordsmokeburger, recordbeefburger, recordpizza, recordapplepie, recordmomo })
    }

})



module.exports = router; //導出路由模塊以供應其他路由使用
