/*
首頁介面控制
*/

/*控制滾輪變色 */
let headerbar = document.getElementById('headerbar')
window.addEventListener('scroll', (e) => {
    if (window.scrollY > 0) {
        headerbar.style.background = 'white'
        headerbar.style.borderBottom = '5px solid #E2E2E2';
        login.style.background = 'black'
        signup.style.background = 'black'
        login.style.color = 'white'
        signup.style.color = 'white'
        login.style.boxShadow = '0.5px 0.5px 1px .5px white'
        signup.style.boxShadow = '0.5px 0.5px 1px .5px white'
    } else {
        headerbar.style.background = 'none'
        headerbar.style.borderBottom = 'none';
        login.style.background = 'white'
        signup.style.background = 'white'
        login.style.color = 'black'
        signup.style.color = 'black'
        login.style.boxShadow = '0.5px 0.5px 1px .5px black'
        signup.style.boxShadow = '0.5px 0.5px 1px .5px black'
    }
})

/*控制隱藏的側邊攔 */
let sidebarbtn = document.getElementById('sidebarbtn')
let hideside = document.querySelector('.hideside')
let sidebars = document.querySelector('.sidebars')
let scrolladmin = document.querySelector('.scrolladmin')


var login = document.getElementById('login')
var signup = document.getElementById('signup')

var sidebarsID = document.getElementById('sidebarsID')

var loginhidesidebtn = document.getElementById('loginhideside')
var signuphidesidebtn = document.getElementById('signuphideside')

loginhidesidebtn.addEventListener('click', () => {
    window.location.href = '/login';
})

signuphidesidebtn.addEventListener('click', () => {
    window.location.href = '/register';
})




sidebarbtn.addEventListener('click', function (e) {
    hideside.classList.toggle('active')
    sidebars.classList.toggle('active')
    scrolladmin.classList.toggle('active')

})

hideside.addEventListener('click', () => {
    hideside.classList.toggle('active')
    sidebars.classList.toggle('active')
    scrolladmin.classList.toggle('active')
})


var loginbtn = document.getElementById('login')
var registerbtn = document.getElementById('signup')
console.log(123);

loginbtn.addEventListener('click', () => {
    window.location.href = '/login';
})

registerbtn.addEventListener('click', () => {
    window.location.href = '/register';
})

function submitForm() {
    document.getElementById("logout-subbmit").click();
}

function seepersonal() {
    document.getElementById("personal").click();
}
var nonlocationmodify = document.getElementById('nonlocationmodify')
var homelocationinput = document.getElementById('homelocationinput')
/*住址填寫 */
function submitlocation() {
    
        document.getElementById("submitlocation").click(); 
        alert('按下確認及即可修改住址')
}

function eat(){
    document.getElementById("goorderbtn").click();
}







