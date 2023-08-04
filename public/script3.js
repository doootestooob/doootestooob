/*
控制購物車點餐
*/

//添加絕對路徑
var baseURL = "/";

/*餐點起始份數(按照順序左而右，上而下) */
var a = 1
var b = 1
var c = 1
var d = 1
var e = 1
var f = 1

/*餐點製作時間(單位為秒)(按照順序左而右，上而下) */
var atime = 5
var btime = 70
var ctime = 80
var dtime = 200
var etime = 150
var ftime = 120

/*餐點花費金額(按照順序左而右，上而下) */
var acost = 50
var bcost = 60
var ccost = 65
var dcost = 300
var ecost = 100
var fcost = 80
var totalcost = 0

/*初始總共時間 */
var totaltime = 0
var totaltimesec = 0 //轉換時間格式(秒)
var totaltimemin = 0 //轉換時間格式(分鐘)
var totaltimehr = 0  //轉換時間格式(小時)

/*按下買單鍵狀態 */
var finishmealstate = 0
var finishbtn = document.getElementById('finishbtn') //買單鍵導入
var spendtime = document.getElementById('spendtime') //時間顯示導入
var costmoney = document.getElementById('costmoney') //花費金錢顯示導入

/*購物車是否開啟狀態 */
var buycarstate = 0

/*餐點是否進入購物車狀態變數 */
var orederfrenchstate = 0
var oredersmohamstate = 0
var orderbeefhamstate = 0
var orderhampizzastate = 0
var orderapplepiestate = 0
var ordermomostate = 0

/*餐點商品添加的位置導入 */
const fooditems = document.getElementById('fooditems')


/*餐點加入購物車變數 */
var orderfrench = document.getElementById('orderfrench')
var ordersmoham = document.getElementById('ordersmoham')
var orderbeefham = document.getElementById('orderbeefham')
var orderhampizza = document.getElementById('orderhampizza')
var orderapplepie = document.getElementById('orderapplepie')
var ordermomo = document.getElementById('ordermomo')



/* INPUT 餐點 */
var fries = document.getElementById('fries')
var inputtime = document.getElementById('inputtime')
var smokeburger = document.getElementById('smokeburger')
var beefburger = document.getElementById('beefburger')
var pizza = document.getElementById('pizza')
var applepie = document.getElementById('applepie')
var momo = document.getElementById('momo')

/*添加購物車後的變化功能 */
orderfrench.addEventListener('click', () => {
    totalcost = ((orederfrenchstate) * acost * a) + (oredersmohamstate) * bcost * b +
        ((orderbeefhamstate) * ccost * c) + ((orderhampizzastate) * dcost * d) +
        ((orderapplepiestate) * ecost * e) + ((ordermomostate) * fcost * f)
    price.value = totalcost
    costmoney.innerText = "小計：" + totalcost + "元"

    if (orederfrenchstate == 0) {
        orederfrenchstate = 1
        totaltime = 0; // 初始化totaltime為0，避免添加不同餐點會重複疊加時間
        inputtime.value = totaltime
        fries.value = a
        //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0 (這裡不須/2!!因為首次添加)
        totaltime = ((orederfrenchstate) * atime * a) + (oredersmohamstate) * btime * b +
            ((orderbeefhamstate) * ctime * c) + ((orderhampizzastate) * dtime * d) +
            ((orderapplepiestate) * etime * e) + ((ordermomostate) * ftime * f)

        inputtime.value = totaltime
        translatetime()
        spendtime.innerText = totaltime

        totalcost = ((orederfrenchstate / 2) * acost * a) + (oredersmohamstate / 2) * bcost * b +
            ((orderbeefhamstate / 2) * ccost * c) + ((orderhampizzastate / 2) * dcost * d) +
            ((orderapplepiestate / 2) * ecost * e) + ((ordermomostate / 2) * fcost * f)
        price.value = totalcost
        costmoney.innerText = "小計：" + totalcost + "元"
    }
    if (orederfrenchstate == 1) {
        orderfrench.innerText = '已加入購物車'
        orderfrench.style.background = 'gray'
        orderfrench.style.color = 'white'
    }
})

ordersmoham.addEventListener('click', () => {
    totalcost = ((orederfrenchstate) * acost * a) + (oredersmohamstate) * bcost * b +
        ((orderbeefhamstate) * ccost * c) + ((orderhampizzastate) * dcost * d) +
        ((orderapplepiestate) * ecost * e) + ((ordermomostate) * fcost * f)
    price.value = totalcost
    costmoney.innerText = "小計：" + totalcost + "元"

    if (oredersmohamstate == 0) {
        oredersmohamstate = 1
        totaltime = 0; // 初始化totaltime為0，避免添加不同餐點會重複疊加時間
        smokeburger.value = b
        //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0 (這裡不須/2!!因為首次添加)
        totaltime = (orederfrenchstate * atime * a) + (oredersmohamstate * btime * b) +
            (orderbeefhamstate * ctime * c) + (orderhampizzastate * dtime * d) +
            (orderapplepiestate * etime * e) + (ordermomostate * ftime * f);
        inputtime.value = totaltime
        translatetime()
        spendtime.innerText = totaltime

        totalcost = ((orederfrenchstate / 2) * acost * a) + (oredersmohamstate / 2) * bcost * b +
            ((orderbeefhamstate / 2) * ccost * c) + ((orderhampizzastate / 2) * dcost * d) +
            ((orderapplepiestate / 2) * ecost * e) + ((ordermomostate / 2) * fcost * f)
        price.value = totalcost
        costmoney.innerText = "小計：" + totalcost + "元"
    }
    if (oredersmohamstate == 1) {
        ordersmoham.innerText = '已加入購物車'
        ordersmoham.style.background = 'gray'
    }

})

orderbeefham.addEventListener('click', () => {
    totalcost = ((orederfrenchstate) * acost * a) + (oredersmohamstate) * bcost * b +
        ((orderbeefhamstate) * ccost * c) + ((orderhampizzastate) * dcost * d) +
        ((orderapplepiestate) * ecost * e) + ((ordermomostate) * fcost * f)
    price.value = totalcost
    costmoney.innerText = "小計：" + totalcost + "元"

    if (orderbeefhamstate == 0) {
        orderbeefhamstate = 1
        totaltime = 0; // 初始化totaltime為0，避免添加不同餐點會重複疊加時間
        beefburger.value = c
        //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0 (這裡不須/2!!因為首次添加)
        totaltime = ((orederfrenchstate) * atime * a) + (oredersmohamstate) * btime * b +
            ((orderbeefhamstate) * ctime * c) + ((orderhampizzastate) * dtime * d) +
            ((orderapplepiestate) * etime * e) + ((ordermomostate) * ftime * f)
        inputtime.value = totaltime
        translatetime()
        spendtime.innerText = totaltime

        totalcost = ((orederfrenchstate / 2) * acost * a) + (oredersmohamstate / 2) * bcost * b +
            ((orderbeefhamstate / 2) * ccost * c) + ((orderhampizzastate / 2) * dcost * d) +
            ((orderapplepiestate / 2) * ecost * e) + ((ordermomostate / 2) * fcost * f)
        price.value = totalcost
        costmoney.innerText = "小計：" + totalcost + "元"
    }
    if (orderbeefhamstate == 1) {
        orderbeefham.innerText = '已加入購物車'
        orderbeefham.style.background = 'gray'
        orderbeefham.style.color = 'white'
    }
})

orderhampizza.addEventListener('click', () => {
    totalcost = ((orederfrenchstate) * acost * a) + (oredersmohamstate) * bcost * b +
        ((orderbeefhamstate) * ccost * c) + ((orderhampizzastate) * dcost * d) +
        ((orderapplepiestate) * ecost * e) + ((ordermomostate) * fcost * f)
    price.value = totalcost
    costmoney.innerText = "小計：" + totalcost + "元"

    if (orderhampizzastate == 0) {
        orderhampizzastate = 1
        totaltime = 0; // 初始化totaltime為0，避免添加不同餐點會重複疊加時間
        pizza.value = d
        //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0 (這裡不須/2!!因為首次添加)
        totaltime = ((orederfrenchstate) * atime * a) + (oredersmohamstate) * btime * b +
            ((orderbeefhamstate) * ctime * c) + ((orderhampizzastate) * dtime * d) +
            ((orderapplepiestate) * etime * e) + ((ordermomostate) * ftime * f)
        inputtime.value = totaltime
        translatetime()
        spendtime.innerText = totaltime

        totalcost = ((orederfrenchstate / 2) * acost * a) + (oredersmohamstate / 2) * bcost * b +
            ((orderbeefhamstate / 2) * ccost * c) + ((orderhampizzastate / 2) * dcost * d) +
            ((orderapplepiestate / 2) * ecost * e) + ((ordermomostate / 2) * fcost * f)
        price.value = totalcost
        costmoney.innerText = "小計：" + totalcost + "元"
    }
    if (orderhampizzastate == 1) {
        orderhampizza.innerText = '已加入購物車'
        orderhampizza.style.background = 'gray'
        orderhampizza.style.color = 'white'
    }
})

orderapplepie.addEventListener('click', () => {
    totalcost = ((orederfrenchstate) * acost * a) + (oredersmohamstate) * bcost * b +
        ((orderbeefhamstate) * ccost * c) + ((orderhampizzastate) * dcost * d) +
        ((orderapplepiestate) * ecost * e) + ((ordermomostate) * fcost * f)
    price.value = totalcost
    costmoney.innerText = "小計：" + totalcost + "元"

    if (orderapplepiestate == 0) {
        orderapplepiestate = 1
        totaltime = 0; // 初始化totaltime為0，避免添加不同餐點會重複疊加時間
        applepie.value = e
        //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0 (這裡不須/2!!因為首次添加)
        totaltime = ((orederfrenchstate) * atime * a) + (oredersmohamstate) * btime * b +
            ((orderbeefhamstate) * ctime * c) + ((orderhampizzastate) * dtime * d) +
            ((orderapplepiestate) * etime * e) + ((ordermomostate) * ftime * f)
        inputtime.value = totaltime
        translatetime()
        spendtime.innerText = totaltime

        totalcost = ((orederfrenchstate / 2) * acost * a) + (oredersmohamstate / 2) * bcost * b +
            ((orderbeefhamstate / 2) * ccost * c) + ((orderhampizzastate / 2) * dcost * d) +
            ((orderapplepiestate / 2) * ecost * e) + ((ordermomostate / 2) * fcost * f)
        price.value = totalcost
        costmoney.innerText = "小計：" + totalcost + "元"
    }
    if (orderapplepiestate == 1) {
        orderapplepie.innerText = '已加入購物車'
        orderapplepie.style.background = 'gray'
        orderapplepie.style.color = 'white'
    }
})

ordermomo.addEventListener('click', () => {
    totalcost = ((orederfrenchstate) * acost * a) + (oredersmohamstate) * bcost * b +
        ((orderbeefhamstate) * ccost * c) + ((orderhampizzastate) * dcost * d) +
        ((orderapplepiestate) * ecost * e) + ((ordermomostate) * fcost * f)
    price.value = totalcost
    costmoney.innerText = "小計：" + totalcost + "元"

    if (ordermomostate == 0) {
        ordermomostate = 1
        totaltime = 0; // 初始化totaltime為0，避免添加不同餐點會重複疊加時間
        momo.value = f
        //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0 (這裡不須/2!!因為首次添加)
        totaltime = ((orederfrenchstate) * atime * a) + (oredersmohamstate) * btime * b +
            ((orderbeefhamstate) * ctime * c) + ((orderhampizzastate) * dtime * d) +
            ((orderapplepiestate) * etime * e) + ((ordermomostate) * ftime * f)
        inputtime.value = totaltime
        translatetime()
        spendtime.innerText = totaltime

        totalcost = ((orederfrenchstate / 2) * acost * a) + (oredersmohamstate / 2) * bcost * b +
            ((orderbeefhamstate / 2) * ccost * c) + ((orderhampizzastate / 2) * dcost * d) +
            ((orderapplepiestate / 2) * ecost * e) + ((ordermomostate / 2) * fcost * f)
        price.value = totalcost
        costmoney.innerText = "小計：" + totalcost + "元"
    }
    if (ordermomostate == 1) {
        ordermomo.innerText = '已加入購物車'
        ordermomo.style.background = 'gray'
        ordermomo.style.color = 'white'
    }
})


/*====================購物車開啟後的功能========================= */
buycar.addEventListener('click', () => {


    setInterval(function () {
        if (finishmealstate !== 0) {  //修
            totaltime = ((orederfrenchstate / 2) * atime * fries.value) + (oredersmohamstate / 2) * btime * smokeburger.value +
                ((orderbeefhamstate / 2) * ctime * beefburger.value) + ((orderhampizzastate / 2) * dtime * pizza.value) +
                ((orderapplepiestate / 2) * etime * applepie.value) + ((ordermomostate / 2) * ftime * momo.value)

            inputtime.value = totaltime
        }




    }, 100)   //每次開啟購物車後，即時更新餐點所需時間與金額

    //薯條
    translatetime()

    if (orederfrenchstate == 1 && buycarstate == 0) {
        buycarstate = 1             //防止重複疊加餐點佔空間

    }
    if (orederfrenchstate == 1 && buycarstate == 1) {
        orederfrenchstate = 2

        const shopcarfrench = document.createElement("div"); //創建新的div項目
        fooditems.appendChild(shopcarfrench)   //新增元素加入的位置
        shopcarfrench.setAttribute('class', "shoppingitem")//用class控制整體排版
        shopcarfrench.setAttribute('id', 'shoppingfrench1')//用id控制單個項目的資訊
        shoppingfrench1.innerText = '薯條'

        const deletebtn = document.createElement("div"); //移除餐點(專一性)
        shoppingfrench1.appendChild(deletebtn)
        deletebtn.setAttribute('class', 'btndelete')
        deletebtn.setAttribute('id', 'frenchdelete')
        frenchdelete.innerText = 'X'
        frenchdelete.addEventListener('click', () => {
            orederfrenchstate = 0
            buycarstate = 0
            a = 1
            fries.value = 0
            shopcarfrench.remove();
            orderfrench.innerText = '加入購物車'
            orderfrench.style.background = '#ff6b81'

            //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0
            totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
            inputtime.value = totaltime

            totalcost = ((orederfrenchstate / 2) * acost * a) + (oredersmohamstate / 2) * bcost * b +
                ((orderbeefhamstate / 2) * ccost * c) + ((orderhampizzastate / 2) * dcost * d) +
                ((orderapplepiestate / 2) * ecost * e) + ((ordermomostate / 2) * fcost * f)
            price.value = totalcost
            costmoney.innerText = "小計：" + totalcost + "元"
            translatetime()

        })

        const p1frech = document.createElement("img") //創建餐點圖片(全域)
        shoppingfrench1.appendChild(p1frech)
        p1frech.setAttribute('class', 'imgforshoppingcar')
        p1frech.setAttribute('src', baseURL + 'images/frenchfrices.jpg')

        const s1french = document.createElement("div")//創建餐點說明
        shoppingfrench1.appendChild(s1french)
        s1french.setAttribute('class', 'illformeal')//創建餐點說明(全域)
        s1french.setAttribute('id', 'illfors1french')//創建餐點說明(專一性)
        illfors1french.innerText = '每1份薯條為50元,每1份製作時間預計為40秒'

        const controlfrench = document.createElement("div")//創建餐點加減面板
        shoppingfrench1.appendChild(controlfrench)
        controlfrench.setAttribute('id', 'bandformealfrench')//創建餐點加減面板(專一性)
        controlfrench.setAttribute('class', 'bandformeal')//創建餐點加減面板(全域)

        const removefrench = document.createElement("div")//減(專一性)
        bandformealfrench.appendChild(removefrench)
        removefrench.setAttribute('id', 'frenchremove')
        removefrench.setAttribute('class', 'removebtn')
        removefrench.innerText = '-'
        frenchremove.addEventListener('click', () => {
            if (a > 1) {
                a--
                qforfrench.innerText = a
                fries.value = a
                //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0
                totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                    ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                    ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
                inputtime.value = totaltime
                translatetime()

                totalcost = ((orederfrenchstate / 2) * acost * a) + (oredersmohamstate / 2) * bcost * b +
                    ((orderbeefhamstate / 2) * ccost * c) + ((orderhampizzastate / 2) * dcost * d) +
                    ((orderapplepiestate / 2) * ecost * e) + ((ordermomostate / 2) * fcost * f)
                price.value = totalcost
                costmoney.innerText = "小計：" + totalcost + "元"
            } else {
                alert('該餐點不可低於1份，如不想點這份餐點，按下移除鍵即可將此餐點從購物車移除')
            }
        })

        const qforfrench = document.createElement("div")//數量(專一性)
        bandformealfrench.appendChild(qforfrench)
        qforfrench.setAttribute('id', 'frenchqantity')
        qforfrench.innerText = a

        const addfrench = document.createElement("div")//加(專一性)
        bandformealfrench.appendChild(addfrench)
        addfrench.setAttribute('class', 'addbtn')
        addfrench.setAttribute('id', 'frenchadd')
        addfrench.innerText = '+'
        frenchadd.addEventListener('click', () => {
            if (14 >= a > 0) {
                a++
                fries.value = a
                qforfrench.innerText = a
                //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0

                totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                    ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                    ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
                inputtime.value = totaltime
                translatetime()
                totalcost = ((orederfrenchstate / 2) * acost * a) + (oredersmohamstate / 2) * bcost * b +
                    ((orderbeefhamstate / 2) * ccost * c) + ((orderhampizzastate / 2) * dcost * d) +
                    ((orderapplepiestate / 2) * ecost * e) + ((ordermomostate / 2) * fcost * f)
                price.value = totalcost
                costmoney.innerText = "小計：" + totalcost + "元"
            } else if (a >= 15) {
                alert('單筆消費每份餐點最多為15份，請勿超過!!')
            }
        })
    }


    //煙燻漢堡
    if (oredersmohamstate == 1 && buycarstate == 0) {
        buycarstate = 1             //防止重複疊加餐點佔空間
    }
    if (oredersmohamstate == 1 && buycarstate == 1) {
        oredersmohamstate = 2

        const shopcarsmoham = document.createElement("div"); //創建新的div項目
        fooditems.appendChild(shopcarsmoham)   //新增元素加入的位置
        shopcarsmoham.setAttribute('class', "shoppingitem")//用class控制整體排版
        shopcarsmoham.setAttribute('id', 'shoppingsmoham1')//用id控制單個項目的資訊
        shoppingsmoham1.innerText = '煙燻漢堡'

        const deletebtn = document.createElement("div"); //移除餐點(專一性)
        shoppingsmoham1.appendChild(deletebtn)
        deletebtn.setAttribute('class', 'btndelete')
        deletebtn.setAttribute('id', 'smohamdelete')
        smohamdelete.innerText = 'X'
        smohamdelete.addEventListener('click', () => {
            oredersmohamstate = 0
            buycarstate = 0
            b = 1
            smokeburger.value = 0
            shopcarsmoham.remove();
            ordersmoham.innerText = '加入購物車'
            ordersmoham.style.background = '#ff6b81'

            totalcost = ((orederfrenchstate / 2) * acost * a) + (oredersmohamstate / 2) * bcost * b +
                ((orderbeefhamstate / 2) * ccost * c) + ((orderhampizzastate / 2) * dcost * d) +
                ((orderapplepiestate / 2) * ecost * e) + ((ordermomostate / 2) * fcost * f)
            costmoney.innerText = "小計：" + totalcost + "元"

            //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0
            totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
            inputtime.value = totaltime
            translatetime()

            totalcost = ((orederfrenchstate / 2) * acost * a) + (oredersmohamstate / 2) * bcost * b +
                ((orderbeefhamstate / 2) * ccost * c) + ((orderhampizzastate / 2) * dcost * d) +
                ((orderapplepiestate / 2) * ecost * e) + ((ordermomostate / 2) * fcost * f)
            price.value = totalcost
            costmoney.innerText = "小計：" + totalcost + "元"
        })

        const p1smoham = document.createElement("img") //創建餐點圖片(全域)
        shoppingsmoham1.appendChild(p1smoham)
        p1smoham.setAttribute('class', 'imgforshoppingcar')
        p1smoham.setAttribute('src', baseURL + 'images/menu-burger.jpg')

        const s1smoham = document.createElement("div")//創建餐點說明
        shoppingsmoham1.appendChild(s1smoham)
        s1smoham.setAttribute('class', 'illformeal')//創建餐點說明(全域)
        s1smoham.setAttribute('id', 'illfors1smoham')//創建餐點說明(專一性)
        illfors1smoham.innerText = '每1份煙燻漢堡為60元,每1份製作時間預計為70秒'

        const controlsmoham = document.createElement("div")//創建餐點加減面板
        shoppingsmoham1.appendChild(controlsmoham)
        controlsmoham.setAttribute('id', 'bandformealsmoham')//創建餐點加減面板(專一性)
        controlsmoham.setAttribute('class', 'bandformeal')//創建餐點加減面板(全域)

        const removesmoham = document.createElement("div")//減(專一性)
        bandformealsmoham.appendChild(removesmoham)
        removesmoham.setAttribute('id', 'smohamremove')
        removesmoham.setAttribute('class', 'removebtn')
        removesmoham.innerText = '-'
        smohamremove.addEventListener('click', () => {
            if (b > 1) {
                b--
                qforsmoham.innerText = b
                smokeburger.value = b
                //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0
                totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                    ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                    ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
                inputtime.value = totaltime
                translatetime()

                totalcost = ((orederfrenchstate / 2) * acost * a) + (oredersmohamstate / 2) * bcost * b +
                    ((orderbeefhamstate / 2) * ccost * c) + ((orderhampizzastate / 2) * dcost * d) +
                    ((orderapplepiestate / 2) * ecost * e) + ((ordermomostate / 2) * fcost * f)
                price.value = totalcost
                costmoney.innerText = "小計：" + totalcost + "元"
            } else {
                alert('該餐點不可低於1份，如不想點這份餐點，按下移除鍵即可將此餐點從購物車移除')
            }
        })

        const qforsmoham = document.createElement("div")//數量(專一性)
        bandformealsmoham.appendChild(qforsmoham)
        qforsmoham.setAttribute('id', 'smohamqantity')
        qforsmoham.innerText = b

        const addsmoham = document.createElement("div")//加(專一性)
        bandformealsmoham.appendChild(addsmoham)
        addsmoham.setAttribute('class', 'addbtn')
        addsmoham.setAttribute('id', 'smohamadd')
        addsmoham.innerText = '+'
        smohamadd.addEventListener('click', () => {
            if (14 >= b > 0) {
                b++
                qforsmoham.innerText = b
                smokeburger.value = b
                //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0
                totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                    ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                    ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
                inputtime.value = totaltime
                translatetime()

                totalcost = ((orederfrenchstate / 2) * acost * a) + (oredersmohamstate / 2) * bcost * b +
                    ((orderbeefhamstate / 2) * ccost * c) + ((orderhampizzastate / 2) * dcost * d) +
                    ((orderapplepiestate / 2) * ecost * e) + ((ordermomostate / 2) * fcost * f)
                price.value = totalcost
                costmoney.innerText = "小計：" + totalcost + "元"
            } else if (b >= 15) {
                alert('單筆消費每份餐點最多為15份，請勿超過!!')
            }
        })
    }

    if (orderbeefhamstate == 1 && buycarstate == 0) {
        buycarstate = 1             //防止重複疊加餐點佔空間
    }
    if (orderbeefhamstate == 1 && buycarstate == 1) {
        orderbeefhamstate = 2

        const shopcarbeefham = document.createElement("div"); //創建新的div項目
        fooditems.appendChild(shopcarbeefham)   //新增元素加入的位置
        shopcarbeefham.setAttribute('class', "shoppingitem")//用class控制整體排版
        shopcarbeefham.setAttribute('id', 'shoppingbeefham1')//用id控制單個項目的資訊
        shoppingbeefham1.innerText = '牛肉漢堡'

        const deletebtn = document.createElement("div"); //移除餐點(專一性)
        shoppingbeefham1.appendChild(deletebtn)
        deletebtn.setAttribute('class', 'btndelete')
        deletebtn.setAttribute('id', 'beefhamdelete')
        beefhamdelete.innerText = 'X'
        beefhamdelete.addEventListener('click', () => {
            orderbeefhamstate = 0
            buycarstate = 0
            c = 1
            beefburger.value = 0
            shopcarbeefham.remove();
            orderbeefham.innerText = '加入購物車'
            orderbeefham.style.background = '#ff6b81'

            totalcost = ((orederfrenchstate / 2) * acost * a) + (oredersmohamstate / 2) * bcost * b +
                ((orderbeefhamstate / 2) * ccost * c) + ((orderhampizzastate / 2) * dcost * d) +
                ((orderapplepiestate / 2) * ecost * e) + ((ordermomostate / 2) * fcost * f)
            costmoney.innerText = "小計：" + totalcost + "元"

            //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0
            totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
            inputtime.value = totaltime
            translatetime()
        })

        const p1beefham = document.createElement("img") //創建餐點圖片(全域)
        shoppingbeefham1.appendChild(p1beefham)
        p1beefham.setAttribute('class', 'imgforshoppingcar')
        p1beefham.setAttribute('src', baseURL + 'images/beefhamburger.jpg')

        const s1beefham = document.createElement("div")//創建餐點說明
        shoppingbeefham1.appendChild(s1beefham)
        s1beefham.setAttribute('class', 'illformeal')//創建餐點說明(全域)
        s1beefham.setAttribute('id', 'illfors1beefham')//創建餐點說明(專一性)
        illfors1beefham.innerText = '每1份煙燻漢堡為65元,每1份製作時間預計為80秒'

        const controlbeefham = document.createElement("div")//創建餐點加減面板
        shoppingbeefham1.appendChild(controlbeefham)
        controlbeefham.setAttribute('id', 'bandformealbeefham')//創建餐點加減面板(專一性)
        controlbeefham.setAttribute('class', 'bandformeal')//創建餐點加減面板(全域)

        const removebeefham = document.createElement("div")//減(專一性)
        bandformealbeefham.appendChild(removebeefham)
        removebeefham.setAttribute('id', 'beefhamremove')
        removebeefham.setAttribute('class', 'removebtn')
        removebeefham.innerText = '-'
        beefhamremove.addEventListener('click', () => {
            if (c > 1) {
                c--
                qforbeefham.innerText = c
                beefburger.value = c
                //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0
                totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                    ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                    ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
                inputtime.value = totaltime
                translatetime()
            } else {
                alert('該餐點不可低於1份，如不想點這份餐點，按下移除鍵即可將此餐點從購物車移除')
            }
        })

        const qforbeefham = document.createElement("div")//數量(專一性)
        bandformealbeefham.appendChild(qforbeefham)
        qforbeefham.setAttribute('id', 'smohamqantity')
        qforbeefham.innerText = c

        const addbeefham = document.createElement("div")//加(專一性)
        bandformealbeefham.appendChild(addbeefham)
        addbeefham.setAttribute('class', 'addbtn')
        addbeefham.setAttribute('id', 'beefhamadd')
        addbeefham.innerText = '+'
        beefhamadd.addEventListener('click', () => {
            if (14 >= c > 0) {
                c++
                qforbeefham.innerText = c
                beefburger.value = c
                //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0
                totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                    ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                    ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
                inputtime.value = totaltime
                translatetime()
            } else if (c >= 15) {
                alert('單筆消費每份餐點最多為15份，請勿超過!!')
            }
        })

    }

    //火腿披薩
    if (orderhampizzastate == 1 && buycarstate == 0) {
        buycarstate = 1             //防止重複疊加餐點佔空間
    }
    if (orderhampizzastate == 1 && buycarstate == 1) {
        orderhampizzastate = 2
        const shopcarhampizza = document.createElement("div"); //創建新的div項目
        fooditems.appendChild(shopcarhampizza)   //新增元素加入的位置
        shopcarhampizza.setAttribute('class', "shoppingitem")//用class控制整體排版
        shopcarhampizza.setAttribute('id', 'shoppinghampizza1')//用id控制單個項目的資訊
        shoppinghampizza1.innerText = '火腿披薩'

        const deletebtn = document.createElement("div"); //移除餐點(專一性)
        shoppinghampizza1.appendChild(deletebtn)
        deletebtn.setAttribute('class', 'btndelete')
        deletebtn.setAttribute('id', 'hampizzadelete')
        hampizzadelete.innerText = 'X'
        hampizzadelete.addEventListener('click', () => {
            orderhampizzastate = 0
            buycarstate = 0
            d = 1
            pizza.value = 0
            shopcarhampizza.remove();
            orderhampizza.innerText = '加入購物車'
            orderhampizza.style.background = '#ff6b81'

            totalcost = ((orederfrenchstate / 2) * acost * a) + (oredersmohamstate / 2) * bcost * b +
                ((orderbeefhamstate / 2) * ccost * c) + ((orderhampizzastate / 2) * dcost * d) +
                ((orderapplepiestate / 2) * ecost * e) + ((ordermomostate / 2) * fcost * f)
            costmoney.innerText = "小計：" + totalcost + "元"

            //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0
            totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
            inputtime.value = totaltime
            translatetime()
        })

        const p1hampizza = document.createElement("img") //創建餐點圖片(全域)
        shoppinghampizza1.appendChild(p1hampizza)
        p1hampizza.setAttribute('class', 'imgforshoppingcar')
        p1hampizza.setAttribute('src', baseURL + 'images/hampizza.jpg')

        const s1hampizza = document.createElement("div")//創建餐點說明
        shoppinghampizza1.appendChild(s1hampizza)
        s1hampizza.setAttribute('class', 'illformeal')//創建餐點說明(全域)
        s1hampizza.setAttribute('id', 'illfors1hampizza')//創建餐點說明(專一性)
        illfors1hampizza.innerText = '每1份火腿披薩為300元,每1份製作時間預計為200秒'

        const controlhampizza = document.createElement("div")//創建餐點加減面板
        shoppinghampizza1.appendChild(controlhampizza)
        controlhampizza.setAttribute('id', 'bandformealhampizza')//創建餐點加減面板(專一性)
        controlhampizza.setAttribute('class', 'bandformeal')//創建餐點加減面板(全域)

        const removebeefham = document.createElement("div")//減(專一性)
        bandformealhampizza.appendChild(removebeefham)
        removebeefham.setAttribute('id', 'hampizzaremove')
        removebeefham.setAttribute('class', 'removebtn')
        removebeefham.innerText = '-'
        hampizzaremove.addEventListener('click', () => {
            if (d > 1) {
                d--
                qforhampizza.innerText = d
                pizza.value = d
                //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0
                totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                    ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                    ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
                inputtime.value = totaltime
                translatetime()
            } else {
                alert('該餐點不可低於1份，如不想點這份餐點，按下移除鍵即可將此餐點從購物車移除')
            }
        })

        const qforhampizza = document.createElement("div")//數量(專一性)
        bandformealhampizza.appendChild(qforhampizza)
        qforhampizza.setAttribute('id', 'hampizzaqantity')
        qforhampizza.innerText = d

        const addhampizza = document.createElement("div")//加(專一性)
        bandformealhampizza.appendChild(addhampizza)
        addhampizza.setAttribute('class', 'addbtn')
        addhampizza.setAttribute('id', 'hampizzaadd')
        addhampizza.innerText = '+'
        hampizzaadd.addEventListener('click', () => {
            if (14 >= d > 0) {
                d++
                qforhampizza.innerText = d
                pizza.value = d
                //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0
                totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                    ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                    ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
                inputtime.value = totaltime
                translatetime()
            } else if (d >= 15) {
                alert('單筆消費每份餐點最多為15份，請勿超過!!')
            }
        })
    }

    //蘋果派
    if (orderapplepiestate == 1 && buycarstate == 0) {
        buycarstate = 1             //防止重複疊加餐點佔空間
    }
    if (orderapplepiestate == 1 && buycarstate == 1) {
        orderapplepiestate = 2
        const shopcarapplepie = document.createElement("div"); //創建新的div項目
        fooditems.appendChild(shopcarapplepie)   //新增元素加入的位置
        shopcarapplepie.setAttribute('class', "shoppingitem")//用class控制整體排版
        shopcarapplepie.setAttribute('id', 'shoppingapplepie1')//用id控制單個項目的資訊
        shoppingapplepie1.innerText = '蘋果派'

        const deletebtn = document.createElement("div"); //移除餐點(專一性)
        shoppingapplepie1.appendChild(deletebtn)
        deletebtn.setAttribute('class', 'btndelete')
        deletebtn.setAttribute('id', 'applepieadelete')
        applepieadelete.innerText = 'X'
        applepieadelete.addEventListener('click', () => {
            orderapplepiestate = 0
            buycarstate = 0
            e = 1
            applepie.value = 0
            shopcarapplepie.remove();
            orderapplepie.innerText = '加入購物車'
            orderapplepie.style.background = '#ff6b81'

            totalcost = ((orederfrenchstate / 2) * acost * a) + (oredersmohamstate / 2) * bcost * b +
                ((orderbeefhamstate / 2) * ccost * c) + ((orderhampizzastate / 2) * dcost * d) +
                ((orderapplepiestate / 2) * ecost * e) + ((ordermomostate / 2) * fcost * f)
            costmoney.innerText = "小計：" + totalcost + "元"

            //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0
            totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
            inputtime.value = totaltime
            translatetime()
        })

        const p1applepie = document.createElement("img") //創建餐點圖片(全域)
        shoppingapplepie1.appendChild(p1applepie)
        p1applepie.setAttribute('class', 'imgforshoppingcar')
        p1applepie.setAttribute('src', baseURL + 'images/applepie.jpg')

        const s1applepie = document.createElement("div")//創建餐點說明
        shoppingapplepie1.appendChild(s1applepie)
        s1applepie.setAttribute('class', 'illformeal')//創建餐點說明(全域)
        s1applepie.setAttribute('id', 'illfors1applepie')//創建餐點說明(專一性)
        illfors1applepie.innerText = '每1份蘋果派為100元,每1份製作時間預計為150秒'

        const controlapplepie = document.createElement("div")//創建餐點加減面板
        shoppingapplepie1.appendChild(controlapplepie)
        controlapplepie.setAttribute('id', 'bandformealapplepie')//創建餐點加減面板(專一性)
        controlapplepie.setAttribute('class', 'bandformeal')//創建餐點加減面板(全域)

        const removeapplepie = document.createElement("div")//減(專一性)
        bandformealapplepie.appendChild(removeapplepie)
        removeapplepie.setAttribute('id', 'applepieremove')
        removeapplepie.setAttribute('class', 'removebtn')
        removeapplepie.innerText = '-'
        applepieremove.addEventListener('click', () => {
            if (e > 1) {
                e--
                qforapplepie.innerText = e
                applepie.value = e
                //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0
                totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                    ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                    ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
                inputtime.value = totaltime
                translatetime()
            } else {
                alert('該餐點不可低於1份，如不想點這份餐點，按下移除鍵即可將此餐點從購物車移除')
            }
        })

        const qforapplepie = document.createElement("div")//數量(專一性)
        bandformealapplepie.appendChild(qforapplepie)
        qforapplepie.setAttribute('id', 'applepieqantity')
        qforapplepie.innerText = e

        const addapplepie = document.createElement("div")//加(專一性)
        bandformealapplepie.appendChild(addapplepie)
        addapplepie.setAttribute('class', 'addbtn')
        addapplepie.setAttribute('id', 'applepieadd')
        addapplepie.innerText = '+'
        applepieadd.addEventListener('click', () => {
            if (14 >= e > 0) {
                e++
                qforapplepie.innerText = e
                applepie.value = e
                //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0
                totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                    ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                    ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
                inputtime.value = totaltime
                translatetime()
            } else if (e >= 15) {
                alert('單筆消費每份餐點最多為15份，請勿超過!!')
            }
        })
    }

    //餃子
    if (ordermomostate == 1 && buycarstate == 0) {
        buycarstate = 1             //防止重複疊加餐點佔空間
    }
    if (ordermomostate == 1 && buycarstate == 1) {
        ordermomostate = 2
        const shopcarmomo = document.createElement("div"); //創建新的div項目
        fooditems.appendChild(shopcarmomo)   //新增元素加入的位置
        shopcarmomo.setAttribute('class', "shoppingitem")//用class控制整體排版
        shopcarmomo.setAttribute('id', 'shoppingmomo1')//用id控制單個項目的資訊
        shoppingmomo1.innerText = '餃子'

        const deletebtn = document.createElement("div"); //移除餐點(專一性)
        shoppingmomo1.appendChild(deletebtn)
        deletebtn.setAttribute('class', 'btndelete')
        deletebtn.setAttribute('id', 'momoadelete')
        momoadelete.innerText = 'X'
        momoadelete.addEventListener('click', () => {
            ordermomostate = 0
            buycarstate = 0
            f = 1
            momo.value = 1
            shopcarmomo.remove();
            ordermomo.innerText = '加入購物車'
            ordermomo.style.background = '#ff6b81'

            totalcost = ((orederfrenchstate / 2) * acost * a) + (oredersmohamstate / 2) * bcost * b +
                ((orderbeefhamstate / 2) * ccost * c) + ((orderhampizzastate / 2) * dcost * d) +
                ((orderapplepiestate / 2) * ecost * e) + ((ordermomostate / 2) * fcost * f)
            costmoney.innerText = "小計：" + totalcost + "元"

            //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0
            totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
            inputtime.value = totaltime
            translatetime()
        })

        const p1momo = document.createElement("img") //創建餐點圖片(全域)
        shoppingmomo1.appendChild(p1momo)
        p1momo.setAttribute('class', 'imgforshoppingcar')
        p1momo.setAttribute('src', baseURL + 'images/dump.png')

        const s1momo = document.createElement("div")//創建餐點說明
        shoppingmomo1.appendChild(s1momo)
        s1momo.setAttribute('class', 'illformeal')//創建餐點說明(全域)
        s1momo.setAttribute('id', 'illformomo')//創建餐點說明(專一性)
        illformomo.innerText = '每1份餃子為80元,每1份製作時間預計為120秒'

        const controlmomo = document.createElement("div")//創建餐點加減面板
        shoppingmomo1.appendChild(controlmomo)
        controlmomo.setAttribute('id', 'bandformealmomo')//創建餐點加減面板(專一性)
        controlmomo.setAttribute('class', 'bandformeal')//創建餐點加減面板(全域)

        const removemomo = document.createElement("div")//減(專一性)
        bandformealmomo.appendChild(removemomo)
        removemomo.setAttribute('id', 'momoremove')
        removemomo.setAttribute('class', 'removebtn')
        removemomo.innerText = '-'
        momoremove.addEventListener('click', () => {
            if (f > 1) {
                f--
                qformomo.innerText = f
                momo.value = f
                //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0
                totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                    ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                    ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
                inputtime.value = totaltime
                translatetime()
            } else {
                alert('該餐點不可低於1份，如不想點這份餐點，按下移除鍵即可將此餐點從購物車移除')
            }
        })

        const qformomo = document.createElement("div")//數量(專一性)
        bandformealmomo.appendChild(qformomo)
        qformomo.setAttribute('id', 'momoqantity')
        qformomo.innerText = f

        const addmomo = document.createElement("div")//加(專一性)
        bandformealmomo.appendChild(addmomo)
        addmomo.setAttribute('class', 'addbtn')
        addmomo.setAttribute('id', 'momoadd')
        addmomo.innerText = '+'
        momoadd.addEventListener('click', () => {
            if (14 >= f > 0) {
                f++
                qformomo.innerText = f
                momo.value = f
                //用orderstate來檢驗餐點是否在購物車內，如果不在該餐點時間將 *0 = 0
                totaltime = ((orederfrenchstate / 2) * atime * a) + (oredersmohamstate / 2) * btime * b +
                    ((orderbeefhamstate / 2) * ctime * c) + ((orderhampizzastate / 2) * dtime * d) +
                    ((orderapplepiestate / 2) * etime * e) + ((ordermomostate / 2) * ftime * f)
                inputtime.value = totaltime
                translatetime()
            } else if (f >= 15) {
                alert('單筆消費每份餐點最多為15份，請勿超過!!')
            }
        })
    }

    /*隨時監聽購物車內是否有餐點 */
    $(document).ready(function () {

        if (finishmealstate !== 0) {  
            totaltime = ((orederfrenchstate / 2) * atime * fries.value) + (oredersmohamstate / 2) * btime * smokeburger.value +
                ((orderbeefhamstate / 2) * ctime * beefburger.value) + ((orderhampizzastate / 2) * dtime * pizza.value) +
                ((orderapplepiestate / 2) * etime * applepie.value) + ((ordermomostate / 2) * ftime * momo.value)
               
                spendtime.innerText = totaltime
                translatetime()

            totalcost = ((orederfrenchstate / 2) * acost * fries.value) + (oredersmohamstate / 2) * bcost * smokeburger.value +
                ((orderbeefhamstate / 2) * ccost * beefburger.value) + ((orderhampizzastate / 2) * dcost * pizza.value) +
                ((orderapplepiestate / 2) * ecost * applepie.value) + ((ordermomostate / 2) * fcost * momo.value)
            price.value = totalcost
            costmoney.innerText = "小計：" + totalcost + "元"
        }


        setInterval(function () {
            if (orederfrenchstate == 2 |
                oredersmohamstate == 2 |
                orderbeefhamstate == 2 |
                orderhampizzastate == 2 |
                orderapplepiestate == 2 |
                ordermomostate == 2) {
                finishbtn.style.background = '#ff6b81'
                finishmealstate = 1

                costmoney.style.color = 'red'

            } else {
                finishbtn.style.background = 'gray'
                finishmealstate = 0
            }
        }, 100)
    })
    /* 轉換時間格式 */
    function translatetime() {
        if (totaltime >= 3600) {

            var totaltimehr = Math.floor(totaltime / 3600);
            var totaltimemin = Math.floor((totaltime % 3600) / 60);
            var totaltimesec = Math.floor((totaltime % 3600) % 60);
            spendtime.innerText = "預計時間：" + totaltimehr + "小時" + totaltimemin + "分鐘" + totaltimesec + "秒";
        } else if (totaltime >= 60) {

            var totaltimesec = (totaltime % 60);
            var totaltimemin = Math.floor(totaltime / 60);
            spendtime.innerText = "預計時間：" + totaltimemin + "分鐘" + totaltimesec + "秒";
        } else if (totaltime < 60) {

            spendtime.innerText = "預計時間：" + totaltime + "秒";
        }
        //時間變色
        if (totaltime >= 3600) {
            spendtime.style.color = 'red'
        } else if (totaltime >= 1800) {
            spendtime.style.color = 'orange'
        } else {
            spendtime.style.color = 'green'
        }
    }
})








/*==============================上面完成========================================*/

/*倒數計時功能 */

var price = document.getElementById('price')
var lefttimeshow = document.getElementById('lefttimeshow')
var countdowntime = document.getElementById('countdowntime')
var lefttime = 0
lefttime = 0
lefttime = countdowntime.value
if (lefttime !== 0 | lefttime !== '' | lefttime !== null) {
    setInterval(function () {
        if (lefttime > 0) {
            spendtime.innerText = '預計時間：' + countdowntime.value + '秒'
            orederfrenchstate = 2
            oredersmohamstate = 2
            orderbeefhamstate = 2
            orderhampizzastate = 2
            orderapplepiestate = 2
            ordermomostate = 2
            lefttimeshow.style.display = 'flex'
            orderapplepie.innerText = '請稍等...'
            orderbeefham.innerText = '請稍等...'
            orderhampizza.innerText = '請稍等...'
            orderfrench.innerText = '請稍等...'
            ordersmoham.innerText = '請稍等...'
            ordermomo.innerText = '請稍等...'
            costmoney.innerText = '小計' + price.value + '元'
            finishbtn.innerText = '請稍等...'
            lefttime--
            finishmealstate = 2
            lefttimeshow.innerText = '剩餘時間：' + lefttime + '秒'
            if (lefttime == 0) {
                lefttimeshow.style.display = 'none'
                spendtime.innerText = '剩餘時間：' + 0 + '秒'
                costmoney.innerText = '小計' + 0 + '元'
                alert('訂單已完成')

                orderapplepie.innerText = '加入購物車'
                orderbeefham.innerText = '加入購物車'
                orderhampizza.innerText = '加入購物車'
                orderfrench.innerText = '加入購物車'
                ordersmoham.innerText = '加入購物車'
                ordermomo.innerText = '加入購物車'

                orederfrenchstate = 0
                oredersmohamstate = 0
                orderbeefhamstate = 0
                orderhampizzastate = 0
                orderapplepiestate = 0
                ordermomostate = 0
                finishbtn.innerText = '去買單'
                finishmealstate = 0
                clearInterval()
            }
        }
    }, 1000)

}



function buymealbtn() {
    if (finishmealstate !== 0) {

        if (lefttime == 0 | lefttime == '' | lefttime == null) {
            document.getElementById('buymealbtn').click()
        } else {

        }
    } else {
        alert('購物車不可為空狀態去買單!!')
    }

}





