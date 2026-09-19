let left = 0
let left2 = 0
let left3 = 0
const greenBox1El = document.getElementsByClassName("ticket_green_box1")[0]
const greenBox2El = document.getElementsByClassName("ticket_green_box2")[0]
const greenBox3El = document.getElementsByClassName("ticket_green_box3")[0]

if (greenBox1El) {
    window.setInterval(function (){
        if(left%2 == 0){
            greenBox1El.style.transition = 'left 1000ms'
            greenBox1El.style.left = '200%'
        }else{
            greenBox1El.style.transition = 'left 0ms'
            greenBox1El.style.left = '-200%'
        }
        left++
    } , 800)
}
if (greenBox2El) {
    window.setInterval(function (){
        if(left2%2 == 0){
            greenBox2El.style.transition = 'left 1000ms'
            greenBox2El.style.left = '200%'
        }else{
            greenBox2El.style.transition = 'left 0ms'
            greenBox2El.style.left = '-200%'
        }
        left2++
    } , 800)
}
if (greenBox3El) {
    window.setInterval(function (){
        if(left3%2 == 0){
            greenBox3El.style.transition = 'left 1000ms'
            greenBox3El.style.left = '200%'
        }else{
            greenBox3El.style.transition = 'left 0ms'
            greenBox3El.style.left = '-200%'
        }
        left3++
    } , 800)
}