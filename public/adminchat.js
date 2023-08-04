var socket = io('http://192.168.0.23:5000');

// 管理員進入房間的事件處理
socket.on('enterroom', function (room) {
    socket.join(room); // 加入指定的房間
    console.log('管理員進入房間：', room);

    // 向後端請求該房間的聊天紀錄
    socket.emit('getChatHistory', room);
});

// 管理員選擇房間的事件處理
var roomSelect = document.getElementById("roomSelect");
roomSelect.addEventListener("change", function () {
    var selectedRoom = roomSelect.value;
    socket.emit('selectroom', selectedRoom); // 告訴後端管理員選擇的房間
});

// 管理員發送訊息事件處理
var chatsend = document.getElementById("chatsend");
var chatinput = document.getElementById("chatinput");

chatsend.addEventListener("click", function () {
    var selectedRoom = roomSelect.value;
    var message = chatinput.value;
    if (message != "") {
        socket.emit("sendchat", { message: message, role: "admin", room: selectedRoom });
        chatinput.value = "";
    }
});

socket.on("chatmessage", function (data) {
    var chatbody = document.getElementById("chatbody");
    if (data.role === "admin") {
        const messagediv = `<div id="chatmessage">
        
        <div id="bossmessage">${data.message}</div>
    </div>`;
        chatbody.innerHTML += messagediv;
    } else {
        const messagediv = `<div id="chatmessage">
        <div id="customermessage">${data.message}</div>
    </div>`;
        chatbody.innerHTML += messagediv;
    }
});

// 顯示聊天紀錄
socket.on("chatHistory", function (history) {
    var chatbody = document.getElementById("chatbody");
    chatbody.innerHTML = ""; // 清空聊天區域
    history.forEach(function (messageData) {
        var messageDiv = document.createElement("div");
        messageDiv.style.width = "100%";
        if (messageData.role === "admin") {
            messageDiv = `
                <div id="chatmessage">
                   
                    <div id="bossmessage">${messageData.message}</div>
                </div>
            `;

        } else {
            messageDiv = `
                <div id="chatmessage">
                    <div id="customermessage">${messageData.message}</div>
                </div>
            `;

        }
        chatbody.innerHTML += messageDiv;
    });
});
