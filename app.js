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
const ip = '192.168.0.23'
const app = express()
const server = http.createServer(app);
const io = socketio(server);
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');


app.use(session({
    secret: '12345678',
    resave: false,
    saveUninitialized: true,
}));


dotenv.config({ path: './.env' }) //config可引入env檔


//數據庫
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    databasePort: process.env.DATABASE_PORT
})


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

server.listen(port, ip, () => {
    console.log(`服務運行網址為 http://${ip}:${port}`);
})