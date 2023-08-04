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

var personimg = document.getElementById('personimg')
var replaceimg = document.getElementById('replaceimg')
var uploadimginput = document.getElementById('uploadimginput')
var uploadperimg = document.getElementById('uploadperimg')
var suremodifyimg = document.getElementById('suremodifyimg')
function choseimg() {
    uploadimginput.click()
}

function uploadimg() {
    uploadperimg.click()
}

