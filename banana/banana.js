const BANANA_SIZE = 100
const DROP_SPEED = 4

class BananaGame {

  constructor() {
    this.score = 0;
    this.bananaThrower = null
  }

  addPoints(newPoints) {
    this.score += newPoints
  }

  runGame() {
    let level = 1
    this.bananaThrower = setInterval(this.createBanana, (1000 - level*10))
  }

  createBanana() {

    let bananaContainer = document.createElement("div")
    bananaContainer.className = "banana-container"
    bananaContainer.style.display = "none"

    let banana = document.createElement("div")
    banana.className = "banana spinning-banana"

    bananaContainer.appendChild(banana)

    $('.game-box').append(bananaContainer)

    const xRand = Math.random()*($('.game-box').width()-BANANA_SIZE)
    const speedRand = (.5 + Math.random())*DROP_SPEED
    const spinRand = Math.random()

    bananaContainer.style.display = "block"
    bananaContainer.style.transform = "translateX(" + xRand + "px)" + " translateY(-100%)"
    bananaContainer.style.transition = `transform ${speedRand}s linear`

    // TODO: look into requestAnimationFrame here instead
    // 50 is a magic number here
    setTimeout(function(){
      bananaContainer.style.transform = "translateX(" + xRand + "px)" + " translateY(100vh)"
    }, 50)

    $(bananaContainer).on('transitionend', function(event) {
      event.currentTarget.remove()
    })

    $(bananaContainer).click(function(event) {

      let clickedBanana = $(event.currentTarget)
      let bananaPosY = clickedBanana.css('transform').split(", ")[5]
      bananaPosY = bananaPosY.substring(0,bananaPosY.length-1)
      let viewportHeight = $('.game-box').height()

      gobananas.addPoints(Math.round(bananaPosY/viewportHeight*100))
      clickedBanana.remove()
    })
  }
}

let gobananas = new BananaGame()

// gobananas.runGame()

$('.start').click(function(event){
  gobananas.createBanana()
  gobananas.runGame()
  event.currentTarget.remove()
})

//not collision, but set an array of 'stopped banana positions'
//and as each banana falls, set a new "bottom" point in js where
//the next one will stop
