var socket = io('http://localhost:5000');

// 顧客固定選擇房間一

var reqname = document.getElementById("reqname");
var selectedRoom = reqname.value; // 假設顧客選擇房間1

// 客戶端選擇房間的事件處理
socket.emit('selectroom', selectedRoom);
socket.emit('getChatHistory', selectedRoom);

var chatsend = document.getElementById("chatsend");
var chatinput = document.getElementById("chatinput");

chatsend.addEventListener("click", function () {
    console.log(selectedRoom);
    var message = chatinput.value;
    if (message != "") {
        socket.emit("sendchat", { message: message, role: "customer", room: selectedRoom });
        chatinput.value = "";
    }
});

socket.on("chatmessage", function (data) {
    var chatbody = document.getElementById("chatbody");
    if (data.role === "admin") {
        const messagediv = `<div id="chatmessage">
        <div id="boss">客服</div>
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



socket.on("chatHistory", function (history) {
    var chatbody = document.getElementById("chatbody");
    chatbody.innerHTML = ""; // 清空聊天區域
    history.forEach(function (messageData) {
        var messageDiv = document.createElement("div");
        messageDiv.style.width = "100%";
        if (messageData.role === "admin") {
            messageDiv = `
                <div id="chatmessage">
                <div id="boss">客服</div>
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
