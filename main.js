//buttons

// #region GAME LOGIC AND DATA

  //data
  let inflateCount = 0
  let inflateRate = 20
  let balloonWidth = 100
  let balloonHeight = 110
  let maxSize = 300
  let currentPopCount = 0
  let highScore = 0
  let gameLength = 10000
  let clockId = 0
  let timeRemaining = 0
  let currentPlayer = {}
  let currentColor = "red"
  let possibleColor = ["red", "green", "blue", "pink", "aquamarine"]
  
  function startGame(){
    document.getElementById("gameControls").classList.remove("hidden")
    document.getElementById("controls").classList.add("hidden")
    document.getElementById("scoreboard").classList.add("hidden")
    startClock()
    setTimeout(stopGame, gameLength)
  }
  
  function startClock(){
    timeRemaining = gameLength
    drawClock()
    clockId = setInterval(drawClock, 1000)
  }
  
  function stopClock() {
    clearInterval(clockId)
  }
  
  function inflate(){
    
    inflateCount++
    balloonHeight = balloonHeight+inflateRate
    balloonWidth = balloonWidth+inflateRate
    checkBalloonPop()
    draw()
  }
  function getRandomColor(){
    let i = Math.floor(Math.random() * possibleColor.length);
    currentColor = possibleColor[i]
  }
  
  function checkBalloonPop(){
    
    if (balloonHeight >= maxSize ){
      balloonWidth = 0
      balloonHeight = 40
      currentPopCount++
      let balloonElement = document.getElementById("balloon")
      balloonElement.classList.remove(currentColor)
      getRandomColor()
      balloonElement.classList.add(currentColor)
      // @ts-ignore
      document.getElementById("popSound").play()
    }
  
  }
  function drawClock(){
    let countDownElem = document.getElementById('countdown')
    countDownElem.innerText = (timeRemaining / 1000).toString()
    timeRemaining -= 1000
    console.log("a second passes")
  }
  
  function draw(){
    let balloonElem = document.getElementById("balloon")
    let inflateCountElem = document.getElementById("inflateCount")
    let popCountElem = document.getElementById("popCount")
    let highPopCountElem = document.getElementById("highScore")
    let playerNameElem = document.getElementById("currentPlayerName")
  
  
    balloonElem.style.height = balloonHeight + "px"
    balloonElem.style.width = balloonWidth + "px"
  
    inflateCountElem.innerText = inflateCount.toString()
    popCountElem.innerText = currentPopCount.toString()
    highPopCountElem.innerText = currentPlayer.topScore.toString()
    
    playerNameElem.innerText = currentPlayer.name
  }
  
  function stopGame(){
    console.log("game is over")
    
    document.getElementById("gameControls").classList.add("hidden")
    document.getElementById("controls").classList.remove("hidden")
    document.getElementById("scoreboard").classList.remove("hidden")
    
    inflateCount = 0
    balloonHeight = 110
    balloonWidth = 100
  
    if (currentPopCount>currentPlayer.topScore){
      currentPlayer.topScore = currentPopCount
      savePlayers()
    }
  
    currentPopCount = 0
  
    stopClock()
    draw()
    //drawScoreboard()
  
  }
  // #endregion
  
  
  let players =[]
  loadPlayers()
  
  
  function setPlayer(event){
    event.preventDefault()
    let form = event.target
  
    let playerName = (form.playerName.value)
    
    currentPlayer = players.find(player => player.name == playerName)
  
    if(!currentPlayer) {
      currentPlayer = { name: playerName, topScore: 0 }
      players.push(currentPlayer)
      savePlayers()
    }
  
    console.log(currentPlayer)
  
  
    form.reset()
    document.getElementById("game")?.classList.remove("hidden")
    form.classList.add("hidden")
    draw()
    //drawScoreboard()
  
  }
  
  function changePlayer(){
    document.getElementById("player-form")?.classList.remove("hidden")
    document.getElementById("game")?.classList.add("hidden")
  }
  function savePlayers(){
    window.localStorage.setItem("players", JSON.stringify(players))
  }
  function loadPlayers(){
    let playersData = JSON.parse(window.localStorage.getItem("players"))
    if(!playersData) {
      players = []
    }else {
      players = playersData
    }
  }
  
  function drawScoreboard(){
    let template = ""
    
  players.sort((p1, p2) => p2.topScore - p1.topScore)
  
    players.forEach(playerList => {
      template += `
      <div class="d-flex space-between">
        <span>
          <i class="fa fa-user"></i>
          ${players.name}
        </span>
        <span>score: ${players.topScore} </span>
      </div>
      `
    })
  
    document.getElementById("playerList").innerHTML = template
  }
  
  
  //drawScoreboard()
  