// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1Turn = true
let player1ModON = false
let player2ModON = false


// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")
const player1ModButton = document.querySelector("#player1-mod-btn")
const player2ModButton = document.querySelector("#player2-mod-btn")




player1ModButton.addEventListener("click", function() {
    player1ModON = changeState(player1ModON)
    // console.log("player1ModON changed to " + player1ModON)
    toggleButtonState(player1ModON, player1ModButton)
    
    
    // if (player1ModON) {
    //     player1ModButton.classList.add("mod-on-btn")
    //     player1ModButton.innerHTML = "ON"
    // } else {
    //     player1ModButton.classList.remove("mod-on-btn")
    //     player1ModButton.innerHTML = "OFF"
    // }
})

player2ModButton.addEventListener("click", function() {
    player2ModON = changeState(player2ModON)
    
    if (player2ModON) {
        player2ModButton.classList.add("mod-on-btn")
        player2ModButton.innerHTML = "ON"
    } else {
        player2ModButton.classList.remove("mod-on-btn")
        player2ModButton.innerHTML = "OFF"
    }
})


function showResetButton() {
    rollBtn.style.display = "none"
    resetBtn.style.display = "block"
}

/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {
    const randomNumber = Math.floor(Math.random() * 6) + 1

    if (player1Turn) {
        player1Score = updateScore(player1Score, randomNumber)
        player1ModON = killModification(player1ModON, player1ModButton)
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = randomNumber
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"
    } else {
        player2Score = updateScore(player2Score, randomNumber)
        player2ModON = killModification(player2ModON, player2ModButton)
        // player2Score += randomNumber
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = randomNumber
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = "Player 1 Turn"
    }
    
    if (player1Score >= 20) {
        message.textContent = "Player 1 Won 🥳"
        showResetButton()
    }  else if (player2Score >= 20) {
        message.textContent = "Player 2 Won 🎉"
        showResetButton()
    }
    player1Turn = !player1Turn
})
 
resetBtn.addEventListener("click", function(){
    reset()
})

function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.textContent = "-"
    player2Dice.textContent = "-"
    message.textContent = "Player 1 Turn"
    resetBtn.style.display = "none"
    rollBtn.style.display = "block"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
}

function updateScore(score, rolledNumber) {
    let numberIsEven = isEven(rolledNumber)
    if (player1Turn && player1ModON || !player1Turn && player2ModON){
        if (numberIsEven) {
            // console.log("is even")
            score += rolledNumber * 2
            // console.log(score)
        } else{
            // console.log("is not even")
            score -= rolledNumber * 2
        }
    } else {
        score += rolledNumber   
    }
    return score
}

function isEven(checksum) {
    if (checksum % 2 === 0) {
        return true
    } else {
        return false
    }
}

function changeState(state) {
    state = !state
    return state
}

function killModification(state, button) {
    state = false
    toggleButtonState(state, button)
    return state
    
}

function toggleButtonState(state, button) {
    if (state) {
        button.classList.add("mod-on-btn")
        button.innerHTML = "ON"
    } else {
        button.classList.remove("mod-on-btn")
        button.innerHTML = "OFF"
    }
}
