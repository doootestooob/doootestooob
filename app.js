/*
登入系統　v1.0 
作者：蔡宇倫
日期:2023/7/1

程式功能:
1.能與SQL數據庫連接
2.bcrypt加密密碼 
3.db.query() 利用查詢將位置參數與輸入值分開，並且將位置參數轉譯、綁定防sql注入
4.env環境變數使變數不再暴露於程式碼中


前置操作：
1. npm i express mysql dotenv hbs    ==>　需自行安裝
2. npm i --save nodemon　　　==>　程式即時更新
3. 在package.json中script中增加 ==>  "start": "nodemon app.js"
4. npm i bcryptjs  ==> 安裝密碼加密
5. npm i cookie-parser jsonwebtoken ==> 安裝cookie解析器功能、json網路令牌
6. npm i express-session ==> 安裝session功能，可將資料保存在後端而不是前端，使資料更安全
如何運行:
npm start

*/
const express = require('express')
const http = require('http');
const socketio = require('socket.io');
const path = require('path') //用nodejs自帶的path可以加入不同檔案
const mysql = require('mysql')
const dotenv = require('dotenv') //使用dotenv讓變數保存在後端而不是程式碼內，使資料更安全
const port = 5000

const app = express()
const server = http.createServer(app);
const io = socketio(server);
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const line = require('@line/bot-sdk');
const bcrypt = require('bcryptjs');

var linebot = require('linebot');

const { NlpManager } = require('node-nlp');

const nlpManager = new NlpManager({ languages: ['zh'] });



dotenv.config({ path: './.env' }) //config可引入env檔


//數據庫
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const client = new line.Client({
    channelAccessToken: 'ohRrypzVW/bu6xWAal4vhoamz3/LOZlo2GBBzptwzo40Qro6JMeMsdZqlqOHb3rbWftgXqMS+99S3Yws8oKSll3UF0kKp6IDGvm+9Mn+2/iFKtNRstxy3Rx/GO9fNLZFh9M2EpIv3VkTJeUjy0Ga+gdB04t89/1O/w1cDnyilFU='
});

var bot = linebot({
    channelId: '2000338776',
    channelSecret: '622afe9ba18595b83167fa0b251baaf6',
    channelAccessToken: 'ohRrypzVW/bu6xWAal4vhoamz3/LOZlo2GBBzptwzo40Qro6JMeMsdZqlqOHb3rbWftgXqMS+99S3Yws8oKSll3UF0kKp6IDGvm+9Mn+2/iFKtNRstxy3Rx/GO9fNLZFh9M2EpIv3VkTJeUjy0Ga+gdB04t89/1O/w1cDnyilFU='
});

bot.on('join', function (event) {
    event.reply('歡迎加入本群組，請輸入點餐時刻的帳密綁定帳號才能使用通訊功能喔！以下為輸入格式：');
    event.reply('帳號：點餐時刻的帳號');
    event.reply('密碼：點餐時刻的密碼');
});

var accountstate;
var assessemail;
bot.on('message', function (event) {

    const userId = event.source.userId;
    const msg = event.message.text;

    const accountbolen = msg.includes('帳號：', '帳號:');
    const passwordbolen = msg.includes('密碼：', '密碼:');

    let account = '';
    var password = '';
    const accountfunction = () => { if (accountbolen == true) { account = msg.split('：')[1]; } }
    accountfunction();
    const passwordfunction = () => { if (passwordbolen == true) { password = msg.split('：')[1]; } }
    passwordfunction();


    db.query('SELECT * FROM users WHERE LineID = ?', [userId], async (error, results) => {
        if (results.length == 0 & accountbolen == false & passwordbolen == false) {
            accountstate = 0
            console.log(accountstate);
            event.reply('首次使用請先輸入點餐時刻的帳號密碼來綁定喔！以下為輸入格式：\n帳號：xxxxxx\n密碼：xxxxxx');

        }
        if (accountbolen == true) {
            db.query('SELECT * FROM users WHERE email = ?', [account], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                if (results.length == 0) {
                    event.reply('帳號尚未註冊喔！');
                    accountstate = 0
                } else {
                    event.reply('請輸入密碼喔！以下為輸入格式：\n密碼：xxxxxx');
                    accountstate = 1
                    console.log(accountstate);
                }
            })

            assessemail = account
            console.log('有效帳號', assessemail);
        }
        if (passwordbolen == true & accountstate == 1) {
            db.query('SELECT * FROM users WHERE email = ?', [assessemail], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                if (!(await bcrypt.compare(password, results[0].password))) {
                    event.reply(assessemail + '密碼錯誤！\n請重新輸入密碼喔！');
                    accountstate = 0
                } else {
                    console.log('綁定成功');
                    const name = results[0].name;
                    db.query('UPDATE users SET LineID = ? WHERE email = ?', [userId, assessemail], async (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        console.log('資料庫更新成功');
                        event.reply(assessemail + '綁定成功！\n歡迎' + name + '使用本服務！');
                    });
                }

            });
        } else if (passwordbolen == true & accountstate == 0) {
            event.reply('請先輸入帳號喔！');
        }

        /*============================= */
        if (results.length > 0) {
            const trainingData = {
                intents: [
                    {
                        intent: 'questionfortime',
                        utterances: [
                            { utterance: '我想問一下我的餐點', weight: 2 },
                            { utterance: '餐點需要多久做好？', weight: 2 },
                            { utterance: '餐點要多久做好？', weight: 2 },
                            { utterance: '餐點啥時好', weight: 2 },
                            { utterance: '餐點什麼時候好', weight: 2 },
                            { utterance: '你能告訴我做餐點需要多久嗎？', weight: 2 },
                            { utterance: '餐點製作時間是多少？', weight: 2 }
                        ]
                    },
                    {
                        intent: 'questionforfinish',
                        utterances: [
                            { utterance: '餐點好了嗎', weight: 1.5 },
                            { utterance: '餐點做好了嗎', weight: 1.5 },
                            { utterance: '餐點製作完成了嗎', weight: 1.5 },
                            { utterance: '餐點完成了嗎', weight: 1.5 }
                        ]
                    },
                    {
                        intent: 'greeting',
                        utterances: [
                            { utterance: '你好', weight: 1.5 },
                            { utterance: '安安', weight: 1.5 },
                            { utterance: '嗨', weight: 1.5 },
                            { utterance: 'hello', weight: 1.5 },
                            { utterance: 'hi', weight: 1.5 }
                        ]
                    },
                    {
                        intent: 'responOK',
                        utterances: [
                            { utterance: 'OK', weight: 1.5 },
                            { utterance: '好的', weight: 1.5 },
                            { utterance: '了解', weight: 1.5 },
                            { utterance: '嗯', weight: 1.5 },
                            { utterance: '喔', weight: 1.5 },
                            { utterance: '知道了', weight: 1.5 },
                            { utterance: '好', weight: 1.5 }
                        ]
                    },
                    {
                        intent: 'responthanks',
                        utterances: [
                            { utterance: '謝謝', weight: 1.5 },
                            { utterance: '感謝', weight: 1.5 },
                            { utterance: '感恩', weight: 1.5 },
                            { utterance: '了解，謝謝，感恩，感謝', weight: 1.5 },
                            { utterance: '好的，謝謝，感恩，感謝', weight: 1.5 },
                            { utterance: '知道了,謝謝，感恩，感謝', weight: 1.5 }
                        ]
                    },
                    {
                        intent: 'respontquestion',
                        utterances: [
                            { utterance: '你知道', weight: 1.5 },
                            { utterance: '可以詢問', weight: 1.5 },
                            { utterance: '我想問', weight: 1.5 },
                            { utterance: '不好意思，請問', weight: 1.5 },
                            { utterance: '您好，請問', weight: 1.5 },
                            { utterance: '想詢問', weight: 1.5 },
                            { utterance: '?', weight: 1.5 },
                            { utterance: '什麼', weight: 1.5 },
                            { utterance: '甚麼', weight: 1.5 },
                            { utterance: '啥', weight: 1.5 },
                            { utterance: '我可以做啥', weight: 1.5 },
                            { utterance: '我可以做什麼', weight: 1.5 },
                            { utterance: '我可以做甚麼', weight: 1.5 },
                            { utterance: '我可以說啥', weight: 1.5 },
                            { utterance: '我可以說什麼', weight: 1.5 },
                            { utterance: '我可以說甚麼', weight: 1.5 },
                            { utterance: '我可以問啥', weight: 1.5 },
                            { utterance: '我可以問什麼', weight: 1.5 },
                            { utterance: '我可以查啥', weight: 1.5 },
                            { utterance: '我可以查什麼', weight: 1.5 },
                            { utterance: '我要怎麼使用', weight: 1.5 },
                            { utterance: '我要怎麼用', weight: 1.5 },
                            { utterance: '我要怎麼操作', weight: 1.5 },
                            { utterance: '你能做啥', weight: 1.5 },
                            { utterance: '你能做什麼', weight: 1.5 },
                            { utterance: '你能說啥', weight: 1.5 },
                            { utterance: '你能說什麼', weight: 1.5 },
                           
                        ]
                    },
                    {
                        intent: 'questionfororder',
                        utterances: [
                            { utterance: '我點了什麼餐點？', weight: 2 },
                            { utterance: '我有叫了什麼餐點？', weight: 2 },
                            { utterance: '我點了啥餐點？', weight: 2 },
                            { utterance: '我的餐點有啥？', weight: 2 },
                            { utterance: '我的餐點裡有甚麼？', weight: 2 },
                            { utterance: '我吃了啥餐點', weight: 2 },
                            { utterance: '我吃了什麼餐點', weight: 2 },
                            { utterance: '我吃了甚麼餐點', weight: 2 },
                            { utterance: '我吃了啥', weight: 2 },
                            { utterance: '我吃了什麼', weight: 2 },
                            { utterance: '我訂單裡有什麼', weight: 2 },
                            { utterance: '我有點了什麼餐點？', weight: 2 },
                        ]
                    },
                    {
                        intent: 'norespon',
                        utterances: [
                            { utterance: '我可以點餐嗎', weight: 1.5 },
                            { utterance: '我想點餐', weight: 1.5 },
                            { utterance: '我要點餐', weight: 1.5 },
                            { utterance: '我能點餐嗎', weight: 1.5 },
                            { utterance: '我可以訂餐嗎', weight: 1.5 },
                            { utterance: '我想訂餐', weight: 1.5 },
                            { utterance: '什', weight: 1.5 },
                            { utterance: '麼', weight: 1.5 },
                            { utterance: '裡', weight: 1.5 },
                            { utterance: '你', weight: 1.5 },
                            { utterance: '我', weight: 1.5 },
                            { utterance: '他', weight: 1.5 },
                            { utterance: '它', weight: 1.5 },
                            { utterance: '想', weight: 1.5 },
                            { utterance: '不', weight: 1.5 },
                            { utterance: '詢', weight: 1.5 },
                            { utterance: '問', weight: 1.5 },
                            { utterance: '知', weight: 1.5 },
                            { utterance: '道', weight: 1.5 },
                            { utterance: '可', weight: 1.5 },
                            { utterance: '以', weight: 1.5 },
                            { utterance: '請', weight: 1.5 },
                            { utterance: '謝', weight: 1.5 },
                            { utterance: '感', weight: 1.5 },
                            { utterance: '恩', weight: 1.5 },
                            { utterance: '了', weight: 1.5 },
                            { utterance: '解', weight: 1.5 },
                            { utterance: '的', weight: 1.5 },
                            { utterance: '您', weight: 1.5 },
                            { utterance: '意', weight: 1.5 },
                            { utterance: '思', weight: 1.5 },
                            { utterance: '有', weight: 1.5 },
                            { utterance: '沒', weight: 1.5 },
                        ]
                    }

                ]
            };
            (async () => {
                for (const intentData of trainingData.intents) {
                    for (const utteranceData of intentData.utterances) {
                        nlpManager.addDocument('zh', utteranceData.utterance, intentData.intent, utteranceData.weight);
                    }
                }
                await nlpManager.train();
                console.log('模型訓練完成');


                function handleUserInput(msg) {
                    const language = 'zh';

                    (async () => {
                        const response = await nlpManager.process(language, msg);
                        if (response.intent === 'respontquestion') {
                            event.reply('很高興能為您服務，我能為您提供餐點相關的服務，請問您想詢問什麼呢？🤔')
                        } else if (response.intent === 'questionforfinish') {
                            db.query('SELECT * FROM usersorder WHERE LineID = ?', [userId], function (error, results) {
                                if (error) throw error;
                                if (results.length === 0) {
                                    event.reply('您尚未點餐，請先點餐。😢')
                                } else if (results.length > 0 && results[0].finishstate == 1) {
                                    event.reply('您的餐點已完成，請到櫃檯取餐，歡迎再次點餐！😋')
                                } else if (results.length > 0 && results[0].finishstate == 0) {
                                    event.reply('您的餐點尚未完成，請稍後再詢問。😉')
                                }
                            })
                        } else if (response.intent === 'questionfortime') {
                            db.query('SELECT * FROM usersorder WHERE LineID = ?', [userId], function (error, results) {
                                if (error) throw error;
                                if (results.length === 0) {
                                    event.reply('您尚未點餐，請先點餐。😢')
                                } else if (results.length > 0 && results[0].finishstate == 1) {
                                    event.reply('您的餐點已完成，請到櫃檯取餐，歡迎再次點餐！😋')
                                } else if (results.length > 0 && results[0].finishstate == 0) {
                                    const time = results[0].inputtime
                                    event.reply('您的餐點尚未完成，您的餐點還需' + time + '秒後完成，請稍後再詢問。😉')
                                }
                            })

                        } else if (response.intent === 'questionfororder') {
                            db.query('SELECT * FROM usersorder WHERE LineID = ?', [userId], function (error, results) {
                                if (error) throw error;
                                if (results.length === 0) {
                                    event.reply('您尚未點餐，請先點餐。😢')
                                } if (results.length > 0 && results[0].finishstate == 1) {
                                    const fries = results[0].fries !== null ? results[0].fries : '';
                                    const inputtime = results[0].inputtime !== null ? results[0].inputtime : '';
                                    const finishstate = results[0].finishstate !== null ? results[0].finishstate : '';
                                    const price = results[0].price !== null ? results[0].price : '';
                                    const smokeburger = results[0].smokeburger !== null ? results[0].smokeburger : '';
                                    const beefburger = results[0].beefburger !== null ? results[0].beefburger : '';
                                    const pizza = results[0].pizza !== null ? results[0].pizza : '';
                                    const applepie = results[0].applepie !== null ? results[0].applepie : '';
                                    const momo = results[0].momo !== null ? results[0].momo : '';

                                    event.reply('您的餐點已完成，請到櫃檯取餐，歡迎再次點餐！😋\n\n您的餐點如下：\n\n' + '煙燻牛肉堡：' + smokeburger + '個\n' + '牛肉堡：' + beefburger + '個\n' + '薯條：' + fries + '份\n' + '披薩：' + pizza + '份\n' + '蘋果派：' + applepie + '份\n' + '水餃：' + momo + '份\n' + '總金額：' + price + '元\n' + '需等待時間：' + inputtime + '秒' + '\n' + '取餐狀態：' + '可以取餐' + '\n\n謝謝您的光臨！🙏')
                                } else if (results.length > 0 && results[0].finishstate == 0) {
                                    const fries = results[0].fries !== null ? results[0].fries : '';
                                    const inputtime = results[0].inputtime !== null ? results[0].inputtime : '';
                                    const finishstate = results[0].finishstate !== null ? results[0].finishstate : '';
                                    const price = results[0].price !== null ? results[0].price : '';
                                    const smokeburger = results[0].smokeburger !== null ? results[0].smokeburger : '';
                                    const beefburger = results[0].beefburger !== null ? results[0].beefburger : '';
                                    const pizza = results[0].pizza !== null ? results[0].pizza : '';
                                    const applepie = results[0].applepie !== null ? results[0].applepie : '';
                                    const momo = results[0].momo !== null ? results[0].momo : '';

                                    event.reply('您的餐點尚未完成，請稍後再詢問。😉\n\n您的餐點如下：\n\n' + '煙燻牛肉堡：' + smokeburger + '個\n' + '牛肉堡：' + beefburger + '個\n' + '薯條：' + fries + '份\n' + '披薩：' + pizza + '份\n' + '蘋果派：' + applepie + '份\n' + '水餃：' + momo + '份\n' + '總金額：' + price + '元\n' + '需等待時間：' + inputtime + '秒' + '\n' + '取餐狀態：' + '尚未完成' + '\n\n謝謝您的光臨！🙏')
                                }
                            })

                        } else if (response.intent === 'greeting') {
                            event.reply('您好，尊敬的顧客，很高興能為您服務！')

                        } else if (response.intent === 'responOK') {
                            event.reply('很高興能為您服務😊，若對於餐點有任何問題，我們隨時歡迎為您服務！')

                        } else if (response.intent === 'responthanks') {
                            event.reply('不用客氣，很高興能為您服務！👍')

                        } else {
                            event.reply('很抱歉我無法回應其他問題😢')

                        }
                    })();
                }

                handleUserInput(msg);
            })();

        }


    })
});

app.use(session({
    secret: '12345678',
    resave: false,
    saveUninitialized: true,
}));





app.use(express.static('public'));

app.use('/uploads', express.static('uploads'));



// 設置應用的基本URL路徑
app.locals.baseURL = '/';

app.use(express.urlencoded({ extended: false }))//將表單資料以URL形式包裝，extended為false代表不使用第三方擴展

app.set('view engine', 'hbs') //設定渲染引擎為hbs動態網站

db.connect((error) => { //error如果在連線成功時會是null，錯誤時不為null
    if (error) {
        console.log(error);
    } else {
        console.log("SQL 數據庫已連接");
    }

})

app.use('/', require('./routes/pages'))

app.use('/auth', require('./routes/auth')) //導入中間件函數，此函數需導出才可導入

io.on('connection', (socket) => {
    console.log('有客戶端連線');

    // 客戶端選擇房間的事件處理
    socket.on('selectroom', (room) => {
        socket.join(room); // 加入指定的房間
        io.to(room).emit('enterroom', room); // 向該房間中的所有使用者廣播進入房間的訊息

        // 向後端請求該房間的聊天紀錄
        db.query('SELECT * FROM chat_history WHERE room = ? ORDER BY timestamp ASC', [room], (error, results) => {
            if (error) {
                console.error('資料庫查詢錯誤：', error);
                return;
            }

            // 將聊天紀錄回傳給管理員
            socket.emit('chatHistory', results);
        });
    });

    // 監聽客戶端傳送的 'sendchat' 事件
    socket.on('sendchat', (data) => {
        console.log('收到客戶端傳送的訊息：', data.message);

        // 在這裡進行後續處理，例如存儲訊息到資料庫
        const timestamp = new Date().toISOString();
        const sql = 'INSERT INTO chat_history (room, role, message, timestamp) VALUES (?, ?, ?, ?)';
        db.query(sql, [data.room, data.role, data.message, timestamp], (error, result) => {
            if (error) {
                console.error('資料庫插入錯誤：', error);
                return;
            }
            console.log('資料插入成功');
        });

        // 將訊息發送給該房間中的所有使用者
        io.to(data.room).emit('chatmessage', {
            message: data.message,
            role: data.role
        });
    });

    // 監聽客戶端斷線事件
    socket.on('disconnect', () => {
        console.log('有客戶端斷線');
        // 在這裡進行處理，例如更新使用者在線狀態等等
    });
});

// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', 5000, function () {
    console.log('[BOT已準備就緒]');
});

server.listen(port, () => {
    console.log(`服務運行網址為 http://${ip}:${port}`);
})
