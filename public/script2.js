/*
立即點餐介面控制
*/

let buycar = document.getElementById('buycar')
let hideside = document.querySelector('.hideside')
let scrolladmin = document.querySelector('.scrolladmin')
var closebtn = document.getElementById('closebtn')
var buycarpagetit = document.getElementById('buycarpagetit')
var buycarpage = document.querySelector('.buycarpage')
buycar.addEventListener('click', (e) => {
    hideside.classList.toggle('active')
    scrolladmin.classList.toggle('active')
    buycarpage.classList.toggle('active')
    closebtn.style.zIndex = '99'
    buycarpagetit.style.zIndex = '99'
    closebtn.style.color = 'black'
    buycarpagetit.style.color = 'black'
})

closebtn.addEventListener('click', () => {
    buycarpage.classList.toggle('active')
    hideside.classList.toggle('active')
    scrolladmin.classList.toggle('active')
    closebtn.style.zIndex = '-1'
    buycarpagetit.style.zIndex = '-1'
    closebtn.style.color = 'transparent'
    buycarpagetit.style.color = 'transparent'
    buycarstate = 0
})



/*搜尋功能 */
$(document).ready(function () {
    $('#myinput').on('input', function () {
        var keyword = $('#myinput').val().toLowerCase();

        $('.food-menu-box').filter(function () {
            var text = $(this).text().toLowerCase();

            if (text.includes(keyword)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});

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
