let left = 0
window.setInterval(function (){
    if(left%2 == 0){
        document.getElementsByClassName("ticket_green_box")[0].style.transition = 'left 1000ms'
        document.getElementsByClassName("ticket_green_box")[0].style.left = '200%'
    }else{
        document.getElementsByClassName("ticket_green_box")[0].style.transition = 'left 0ms'
        document.getElementsByClassName("ticket_green_box")[0].style.left = '-200%'
    }
    left++
} , 800)



const d = new Date();
let time = d.getTime();
time -= 600000
let expireTime = time + 4500000

let validationTime = new Date(time)
let ExpireTime = new Date(expireTime)


// let dayOfValidation = validationTime.getDate().toString().length === 2 ? validationTime.getDate() : "0" +  validationTime.getDate()

if (validationTime.getDate().toString().length === 2)
    dayOfValidation = validationTime.getDate()
else
    dayOfValidation = "0" +  validationTime.getDate()

if ((validationTime.getMonth()+1).toString().length === 2)
    MonthOfValidation = (validationTime.getMonth()+1)
else
    MonthOfValidation = "0" +  (validationTime.getMonth()+1)
let yearOfValidation = validationTime.getFullYear().toString().substr(2 , 2)
let HoursOfValidation = validationTime.getHours().toString().length === 2 ? validationTime.getHours() : "0" +  validationTime.getHours()
let minutesOfValidation = validationTime.getMinutes().toString().length === 2 ? validationTime.getMinutes() : "0" +  validationTime.getMinutes()



let dayOfExpire = ExpireTime.getDate().toString().length === 2 ? ExpireTime.getDate() : "0" +  ExpireTime.getDate()
// let MonthOfExpire = ExpireTime.getMonth().toString().length === 2 ? ExpireTime.getMonth() : "0" +  ExpireTime.getDate()
let yearOfExpire = ExpireTime.getFullYear().toString().substr(2 , 2)
let HoursOfExpire = ExpireTime.getHours().toString().length === 2 ? ExpireTime.getHours() : "0" +  ExpireTime.getHours()
let minutesOfExpire = ExpireTime.getMinutes().toString().length === 2 ? ExpireTime.getMinutes() : "0" +  ExpireTime.getMinutes()


let validationData = dayOfValidation + "/" + MonthOfValidation + "/" + yearOfValidation + ", " + HoursOfValidation + ":" + minutesOfValidation
let expireDate = dayOfExpire + "/" + MonthOfValidation + "/" + yearOfExpire + ", " + HoursOfExpire + ":" + minutesOfExpire

document.getElementsByClassName("purchase_time")[0].innerHTML = validationData
document.getElementsByClassName("expire_date")[0].innerHTML = expireDate
document.getElementsByClassName("validation_date")[0].innerHTML = validationData