const score = document.querySelector('.score')
const startScreen = document.querySelector('.startScreen')
const gameArea = document.querySelector('.gameArea')

startScreen.addEventListener("click", start)
document.addEventListener("keydown", pressOn)
document.addEventListener("keyup" , pressOff)

let keys = {ArrowUp : false, ArrowDown: false, ArrowLeft : false, ArrowRight : false}
let player = {
    speed: 5
}

function moveLine(){
    let lines = document.querySelectorAll('.line')
    lines.forEach((item) => {
        if(item.y > 1500){
            item.y -= 1500
        }
        item.y += player.speed;
        item.style.top = item.y  + "px"
    })
}

function moveEnemy(car){
    let ene = document.querySelectorAll('.enemy')
    ene.forEach((item) => {
        if(isCollision(car,item)){
            endGame()
        }
        if(item.y > 1500){
            item.y = -600
            item.style.left = Math.floor(Math.random()*150) + "px"
            item.style.backgroundColor = randomColor()
        }
        item.y += player.speed;
        item.style.top = item.y  + "px"
    })
}

function endGame(){
    player.start = false
    score.innerHTML = "Game Over<br>Your Score : " + player.score
    startScreen.classList.remove('hide')

}

function isCollision(a, b){
    let aRect = a.getBoundingClientRect()
    let bRect = b.getBoundingClientRect()
    return !(
        (aRect.bottom < bRect.top) ||
        (aRect.top > bRect.bottom) ||
        (aRect.left > bRect.right) ||
        (aRect.right < bRect.left)
    )
    // return aRect.left < bRect.right && aRect.right > bRect.left && aRect.top > bRect.bottom && aRect.bottom > bRect.top
}

function playGame(){

    let car = document.querySelector('.car')
    moveLine()
    moveEnemy(car)
    let road = gameArea.getBoundingClientRect()
    if(player.start){
        if(keys.ArrowDown && player.y < road.bottom ){player.y += player.speed}
        if(keys.ArrowUp && player.y > road.top){player.y -= player.speed}
        if(keys.ArrowLeft && player.x > 0 ){player.x -= player.speed}
        if(keys.ArrowRight && player.x < (road.width-50)){player.x += player.speed}

        car.style.left = player.x + "px"
        car.style.top = player.y + "px"        
        window.requestAnimationFrame(playGame)
        player.score++;
        score.innerText ="Score : " + player.score;
    }
}
function pressOn(evt){
    evt.preventDefault()
    keys[evt.key] = true

}

function pressOff(evt){
    evt.preventDefault()
    keys[evt.key] = false
    
}

function start(){
    var x = 0
    startScreen.classList.add("hide")
    // gameArea.classList.remove("hide")
    gameArea.innerHTML = ""
    player.start = true
    player.score = 0
    for(let i = 0; i < 10; i++){
        let div = document.createElement("div")
        div.classList.add("line")
        div.y = i*150
        div.style.top = (i*150) + "px"
        gameArea.appendChild(div)
    }
    window.requestAnimationFrame(playGame)
    let car = document.createElement("div")
    // car.innerText = "Car"
    car.setAttribute("class" , "car")
    gameArea.appendChild(car)
    player.x = car.offsetLeft
    player.y = car.offsetTop

    for(let i = 0; i < 3; i++){
        let enemy = document.createElement("div")
        enemy.classList.add("enemy")
        
        enemy.innerHTML = "<br>" + ++x
        enemy.y = ((i+1)*600)*-1
        enemy.style.top = enemy.y + "px"
        enemy.style.left = Math.floor(Math.random()*150) + "px"
        enemy.style.backgroundColor = randomColor()
        gameArea.appendChild(enemy)
    }
    
}

function randomColor(){
    var letters = '0123456789ABCDEF';
  	var color = '#'
  	for (var i = 0; i < 6; i++) {
    	color += letters[Math.floor(Math.random() * 16)];
      }
      let num = Math.random()*10
      console.log("called : color Method"+ num)
  	return color
}



