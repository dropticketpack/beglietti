let left = 0
let left2 = 0
let left3 = 0
window.setInterval(function (){
    if(left%2 == 0){
        document.getElementsByClassName("ticket_green_box1")[0].style.transition = 'left 1000ms'
        document.getElementsByClassName("ticket_green_box1")[0].style.left = '200%'
    }else{
        document.getElementsByClassName("ticket_green_box1")[0].style.transition = 'left 0ms'
        document.getElementsByClassName("ticket_green_box1")[0].style.left = '-200%'
    }
    left++
} , 800)
window.setInterval(function (){
    if(left2%2 == 0){
        document.getElementsByClassName("ticket_green_box2")[0].style.transition = 'left 1000ms'
        document.getElementsByClassName("ticket_green_box2")[0].style.left = '200%'
    }else{
        document.getElementsByClassName("ticket_green_box2")[0].style.transition = 'left 0ms'
        document.getElementsByClassName("ticket_green_box2")[0].style.left = '-200%'
    }
    left2++
} , 800)

window.setInterval(function (){
    if(left3%2 == 0){
        document.getElementsByClassName("ticket_green_box3")[0].style.transition = 'left 1000ms'
        document.getElementsByClassName("ticket_green_box3")[0].style.left = '200%'
    }else{
        document.getElementsByClassName("ticket_green_box3")[0].style.transition = 'left 0ms'
        document.getElementsByClassName("ticket_green_box3")[0].style.left = '-200%'
    }
    left3++
} , 800)