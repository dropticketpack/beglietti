let left = 0
const greenBoxEl = document.getElementsByClassName("ticket_green_box")[0]
if (greenBoxEl) {
    window.setInterval(function (){
        if(left%2 == 0){
            greenBoxEl.style.transition = 'left 1000ms'
            greenBoxEl.style.left = '200%'
        }else{
            greenBoxEl.style.transition = 'left 0ms'
            greenBoxEl.style.left = '-200%'
        }
        left++
    } , 800)
}



const d = new Date();
let time = d.getTime();
time -= 600000
let expireTime = time + 3300000

let validationTime = new Date(time)
let ExpireTime = new Date(expireTime)


// let dayOfValidation = validationTime.getDate().toString().length === 2 ? validationTime.getDate() : "0" +  validationTime.getDate()

let dayOfValidation;
if (validationTime.getDate().toString().length === 2)
    dayOfValidation = validationTime.getDate()
else
    dayOfValidation = "0" +  validationTime.getDate()

let MonthOfValidation;
if ((validationTime.getMonth()+1).toString().length === 2)
    MonthOfValidation = (validationTime.getMonth()+1)
else
    MonthOfValidation = "0" +  (validationTime.getMonth()+1)
let yearOfValidation = validationTime.getFullYear().toString().substring(2 , 4)
let HoursOfValidation = validationTime.getHours().toString().length === 2 ? validationTime.getHours() : "0" +  validationTime.getHours()
let minutesOfValidation = validationTime.getMinutes().toString().length === 2 ? validationTime.getMinutes() : "0" +  validationTime.getMinutes()



let dayOfExpire = ExpireTime.getDate().toString().length === 2 ? ExpireTime.getDate() : "0" +  ExpireTime.getDate()
let MonthOfExpire;
if ((ExpireTime.getMonth()+1).toString().length === 2)
    MonthOfExpire = (ExpireTime.getMonth()+1)
else
    MonthOfExpire = "0" +  (ExpireTime.getMonth()+1)
let yearOfExpire = ExpireTime.getFullYear().toString().substring(2 , 4)
let HoursOfExpire = ExpireTime.getHours().toString().length === 2 ? ExpireTime.getHours() : "0" +  ExpireTime.getHours()
let minutesOfExpire = ExpireTime.getMinutes().toString().length === 2 ? ExpireTime.getMinutes() : "0" +  ExpireTime.getMinutes()


let validationData = dayOfValidation + "/" + MonthOfValidation + "/" + yearOfValidation + ", " + HoursOfValidation + ":" + minutesOfValidation
let expireDate = dayOfExpire + "/" + MonthOfExpire + "/" + yearOfExpire + ", " + HoursOfExpire + ":" + minutesOfExpire

const purchaseTimeEl = document.getElementsByClassName("purchase_time")[0]
const expireDateEl = document.getElementsByClassName("expire_date")[0]
const validationDateEl = document.getElementsByClassName("validation_date")[0]
if (purchaseTimeEl) purchaseTimeEl.innerHTML = validationData
if (expireDateEl) expireDateEl.innerHTML = expireDate
if (validationDateEl) validationDateEl.innerHTML = validationData