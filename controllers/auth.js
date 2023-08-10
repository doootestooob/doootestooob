const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const session = require('express-session');
const dotenv = require('dotenv');

const multer = require('multer');
const path = require('path');
const fs = require('fs');


dotenv.config({ path: './a.env' });

var linebot = require('linebot');

var bot = linebot({
    channelId: '2000338776',
    channelSecret: '622afe9ba18595b83167fa0b251baaf6',
    channelAccessToken: 'ohRrypzVW/bu6xWAal4vhoamz3/LOZlo2GBBzptwzo40Qro6JMeMsdZqlqOHb3rbWftgXqMS+99S3Yws8oKSll3UF0kKp6IDGvm+9Mn+2/iFKtNRstxy3Rx/GO9fNLZFh9M2EpIv3VkTJeUjy0Ga+gdB04t89/1O/w1cDnyilFU='
});


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

//註冊
exports.register = (req, res) => {
    const name = req.body['=name'];
    const email = req.body['=email'];
    const password = req.body['=password'];
    const passwordconfirm = req.body['=passwordconfirm'];

    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0 | email == process.env.ADMIN_EMAIL) { //如果有相同的email
            return res.render('register', {
                message: '該信箱已被註冊'
            })
        } else if (password !== passwordconfirm) { //如果密碼不一致
            return res.render('register', {
                message: '密碼不一致'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8); //將密碼加密
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error, results) => { //將資料存入資料庫
            if (error) {
                console.log(error);
            }
            else {
                console.log(results);

                return res.redirect('/login');
            }
        })
    }
    )
}



//登入
exports.login = async (req, res) => {
    try {
        const email = req.body['=email'];
        const password = req.body['=password'];

        if (!email || !password) { //如果沒有輸入email或password
            return res.status(400).render('login', {
                message: '請輸入信箱和密碼'
            })
        }

        if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            req.session.reqname = process.env.ADMIN_NAME;
            req.session.emailAccount = email;
            req.session.passwordAccount = password;
            return res.redirect('/admin');
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => { //從資料庫中找到email
            if (!results || !(await bcrypt.compare(password, results[0].password))) { //如果沒有找到email或密碼不一致
                res.status(401).render('login', {
                    message: '信箱或密碼錯誤'
                })
            } else {
                const id = results[0].id; //取得id
                const name = results[0].name; //取得name
                const buytimes = results[0].buytimes; //取得buytimes
                const homelocation = results[0].homelocation; //取得homelocation
                const filename = results[0].filename; //取得images

                req.session.emailAccount = email;
                req.session.passwordAccount = password;
                req.session.reqname = name;
                req.session.reqhomelocation = homelocation;
                req.session.reqbuytimes = buytimes;
                req.session.reqfilename = filename;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, { //將id加密
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("The token is: " + token);
                const cookieOptions = { //設定cookie
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000 //設定過期時間
                    ),
                    httpOnly: true //防止瀏覽器端的js調用和修改
                }
                res.cookie('jwt', token, cookieOptions); //將cookie設定為token
                res.status(200).redirect('/loginsuccess'); //將網址導向首頁
            }
        })
    } catch (error) {
        console.log(error);
    }
}


//登出
exports.logout = (req, res) => {
    req.session.reqname = null;
    req.session.passwordAccount = null;
    req.session.emailAccount = null;
    res.clearCookie('jwt'); //清除cookie
    res.cookie('jwt', 'logout', { //將cookie設定為logout
        expires: new Date(Date.now() + 2 * 1000), //設定過期時間
        httpOnly: true //防止瀏覽器端的js調用和修改
    })
    if (req.session.passwordAccount == null && req.session.emailAccount == null) {
        res.status(200).redirect('/'); //將網址導向首頁
    }

}


//查看個人資料
exports.personalinternation = (req, res) => {
    try {
        const email = req.session.emailAccount;
        req.session.reqalert = null;
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => { //從資料庫中找到email

            const name = results[0].name; //取得name
            const buytimes = results[0].buytimes; //取得buytimes
            const homelocation = results[0].homelocation; //取得homelocation
            const filename = results[0].filename; //取得images
            const password = req.session.passwordAccount;

            req.session.emailAccount = email;
            req.session.passwordAccount = password;
            req.session.reqname = name;
            req.session.reqhomelocation = homelocation;
            req.session.reqbuytimes = buytimes;
            req.session.reqfilename = filename;
            return res.redirect("/personalinternation"); //將網址導向首頁  
        })
    } catch (error) {
        console.log(error);
    }
}

//修改頭像圖片
exports.uploadimg = (req, res) => {
    const email = req.session.emailAccount;
    //若無取得圖片檔案
    if (!req.file) {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {

            const name = results[0].name; //取得name
            const buytimes = results[0].buytimes; //取得buytimes
            const homelocation = results[0].homelocation; //取得homelocation
            const filename = results[0].filename; //取得images
            const password = req.session.passwordAccount;

            req.session.emailAccount = email;
            req.session.passwordAccount = password;
            req.session.reqname = name;
            req.session.reqhomelocation = homelocation;
            req.session.reqbuytimes = buytimes;
            req.session.reqfilename = filename;

            req.session.reqalert = "未選擇圖片檔案!!";
            return res.redirect("/personalinternation"); //將網址導向首頁  
        });
    }
    if (req.file) {
        const imageFileName = req.file.filename;

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {

            const name = results[0].name; //取得name
            const buytimes = results[0].buytimes; //取得buytimes
            const homelocation = results[0].homelocation; //取得homelocation
            const filename = results[0].filename; //取得images
            const password = req.session.passwordAccount;

            req.session.emailAccount = email;
            req.session.passwordAccount = password;
            req.session.reqname = name;
            req.session.reqhomelocation = homelocation;
            req.session.reqbuytimes = buytimes;
            req.session.reqfilename = filename;

            // 刪除舊圖片檔案
            if (filename) {
                const filePath = path.join('./uploads', filename);
                fs.unlinkSync(filePath);
            }

            // 更新資料庫中的圖片檔案名稱
            db.query('UPDATE users SET filename = ? WHERE email = ?', [imageFileName, email], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    db.query('SELECT filename FROM users WHERE email = ?', [email], (error, results) => {
                        if (!error && results.length > 0) {
                            const updatedFileName = results[0].filename;
                            req.session.reqfilename = updatedFileName;
                        }
                        req.session.reqalert = "頭像上傳成功!!";

                        res.redirect("/personalinternation");
                    });
                }
            });
        });
    }
};



//修改住址
exports.location = (req, res) => {
    try {
        const email = req.session.emailAccount;
        const homelocation = req.body['homelocation'];
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => { //從資料庫中找到email

            const name = results[0].name; //取得name
            const buytimes = results[0].buytimes; //取得buytimes
            const filename = results[0].filename; //取得images
            const password = req.session.passwordAccount;

            req.session.emailAccount = email;
            req.session.passwordAccount = password;
            req.session.reqname = name;
            req.session.reqhomelocation = homelocation;
            req.session.reqbuytimes = buytimes;
            req.session.reqfilename = filename;

            db.query('UPDATE users SET homelocation = ? WHERE email = ?', [homelocation, email], (error, results) => { //將資料存入資料庫
                if (error) {
                    console.log(error);
                } else if (homelocation == null || homelocation == "") {
                    req.session.reqalert = "住址不得為空!!";
                    req.session.reqhomelocation = '';
                    res.redirect("/personalinternation");
                }
                else {
                    req.session.reqhomelocation = homelocation;
                    req.session.reqalert = null;
                    res.redirect("/personalinternation");
                }
            })
        })
    } catch (error) {
        console.log(error);
    }
}


//前往點餐介面
exports.goorder = (req, res) => {
    try {
        const email = req.session.emailAccount;
        req.session.alreadyorder = null;
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => { //從資料庫中找到email

            const name = results[0].name; //取得name
            const buytimes = results[0].buytimes; //取得buytimes
            const homelocation = results[0].homelocation; //取得homelocation
            const filename = results[0].filename; //取得images
            const password = req.session.passwordAccount;

            req.session.emailAccount = email;
            req.session.passwordAccount = password;
            req.session.reqname = name;
            req.session.reqhomelocation = homelocation;
            req.session.reqbuytimes = buytimes;
            req.session.reqfilename = filename;

            if (homelocation == null || homelocation == "") {
                req.session.reqalert = "請先填寫住址才能點餐!!";
                return res.redirect("/personalinternation");
            } else {
                db.query('SELECT * FROM usersorder WHERE email = ?', [email], async (error, results) => { //從資料庫中找到email
                    if (results.length == 0) {
                        return res.redirect('/goorder')
                    } else {
                        const fries = results[0].fries; //取得fries
                        const inputtime = results[0].inputtime; //取得inputtime
                        const finishstate = results[0].finishstate; //取得finishstate
                        const price = results[0].price; //取得price
                        const smokeburger = results[0].smokeburger; //取得smokeburger
                        const beefburger = results[0].beefburger; //取得beefburger
                        const pizza = results[0].pizza; //取得pizza
                        const applepie = results[0].applepie; //取得applepie
                        const momo = results[0].momo; //取得momo

                        req.session.reqfries = fries;
                        req.session.reqinputtime = inputtime;
                        req.session.reqfinishstate = finishstate;
                        req.session.reqprice = price;
                        req.session.reqsmokeburger = smokeburger;
                        req.session.reqbeefburger = beefburger;
                        req.session.reqpizza = pizza;
                        req.session.reqapplepie = applepie;
                        req.session.reqmomo = momo;

                        return res.redirect('/goorder')
                    }
                })

            }

        })

    } catch (error) {
        console.log(error);
    }
}


//點餐
exports.buymeals = (req, res) => {
    try {
        const name = req.session.reqname;
        const email = req.session.emailAccount;
        const homelocation = req.session.reqhomelocation;
        const fries = req.body['fries'];
        const inputtime = req.body['inputtime'];
        const price = req.body['price'];
        const smokeburger = req.body['smokeburger'];
        const beefburger = req.body['beefburger']
        const pizza = req.body['pizza']
        const applepie = req.body['applepie']
        const momo = req.body['momo']

        req.session.reqfries = fries;
        req.session.reqinputtime = inputtime;
        req.session.reqprice = price;
        req.session.reqsmokeburger = smokeburger;
        req.session.reqbeefburger = beefburger;
        req.session.reqpizza = pizza;
        req.session.reqapplepie = applepie;
        req.session.reqmomo = momo;


        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => { //從資料庫中找到email
            const LineID = results[0].LineID !== undefined ? results[0].LineID : null;
            if (LineID == null || LineID == "") {
                req.session.reqalert = "請先綁定LineID才能點餐!!";
                return res.redirect("/personalinternation");

            } else {
                req.session.reqLineID = LineID;
                db.query('SELECT * FROM usersorder WHERE email = ?', [email], async (error, results) => { //從資料庫中找到email

                    if (results.length == 0) {

                        db.query('INSERT INTO usersorder SET ?', { email: email, homelocation: homelocation, fries: fries, inputtime: inputtime, finishstate: 0, price: price, smokeburger: smokeburger, beefburger: beefburger, pizza: pizza, applepie: applepie, momo: momo, LineID: req.session.reqLineID }, (error, results) => { //將資料存入資料庫
                            if (error) {
                                console.log(error);
                            } else {
                                db.query('UPDATE users SET buytimes = buytimes + 1 WHERE email = ?', [email], (error, results) => { //將資料存入資料庫
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log(results);
                                    }
                                })
                                startCountdown(inputtime,);
                                req.session.alreadyorder = null;
                                return res.redirect("/goorder");

                            }
                        })
                    } else if (results.length !== 0 && results[0].finishstate == 1) {
                        db.query('UPDATE usersorder SET ?', { email: email, homelocation: homelocation, fries: fries, inputtime: inputtime, finishstate: 0, price: price, smokeburger: smokeburger, beefburger: beefburger, pizza: pizza, applepie: applepie, momo: momo, LineID: req.session.reqLineID }, (error, results) => { //將資料存入資料庫
                            if (error) {
                                console.log(error);
                            } else {
                                startCountdown(inputtime);
                                req.session.alreadyorder = null;
                                return res.redirect("/goorder");
                            }
                        })
                    } else {
                        db.query('UPDATE usersorder SET finishstate = 0 WHERE email = ?', [email], (error, results) => {
                            req.session.alreadyorder = "已經有訂單了，請等待訂單完成!!";
                            return res.redirect("/goorder");
                        })

                    }
                })
            }
        })



        function startCountdown(time) {
            const countdownInterval = setInterval(() => {
                time--;
                console.log(time);
                db.query('UPDATE usersorder SET inputtime= inputtime - 1 WHERE email = ?', [email], (error, results) => { //將資料存入資料庫
                    if (error) {
                        console.log(error);
                    }
                })
                if (time <= 0) {
                    clearInterval(countdownInterval);
                    console.log('餐點完成');
                    db.query('SELECT * FROM usersorder WHERE email = ?', [email], async (error, results) => { //從資料庫中找到email
                        const price = results[0].price;
                        db.query('UPDATE usersorder SET finishstate = 1 WHERE email = ?', [email], (error, results) => { //將資料存入資料庫
                            if (error) {
                                console.log(error);
                            }
                        })
                        const mail = {
                            title: '餐點已完成',
                            content: '總共' + price + '元' + '，請前往取餐!',
                            time: '時間:' + new Date().toLocaleString()
                        }



                        db.query('INSERT INTO usermail SET ?', { name: name, email: email, title: mail.title, content: mail.content, mailtime: mail.time }, (error, results) => { //將資料存入資料庫
                            if (error) {
                                console.log(error);
                            }
                        })
                    })
                }
            }, 1000);
        }

    } catch (error) {
        console.log(error);
    }
}








