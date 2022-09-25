let score = 0
let myInterval = ""
let completeBoard = 0
let maxTicks = 90
let level = 1
let leaderboardNameArray = []
let leaderboardScoreArray = []
let imgTiles = ["👽", "👽", "🤖", "🤖", "😁", "😁", "🤓", "🤓", "🦞", "🦞", "🚗", "🚗"]
let boardLength = imgTiles.length / 2
let tiles = imgTiles.length
let countNumber=0
let elClickCounter = 0
let valuesArr = []
let idArr = []

const scoreEl = document.getElementById("score")
const leaderboardContainer = document.querySelector(".leaderboard-container")
const clicksEl=document.getElementById("clicks-counter")
const leaderboardNameContainer = document.querySelector(".leaderboard-name-container")
const leaderboardScoreContainer = document.querySelector(".leaderboard-score-container")
const nameEntry = document.getElementById("name-entry")

document.getElementById("start-game").addEventListener("click", startGame)
document.getElementById("reset-btn").addEventListener('click', resetGame)

document.getElementById("new-game").addEventListener("click", () => {
    resetGame()
    document.querySelector(".game-container").style.display = "flex"
    document.querySelector(".leaderboard-section").style.display = "none"
})

document.getElementById("leaderboard").addEventListener("click", () => {
    getLeaderboard()
    document.querySelector(".leaderboard-section").style.display = "block"
    document.querySelector(".start-screen").style.display = "none"
    document.querySelector(".game-container").style.display = "none"
})

document.getElementById("delete-leaderboard").addEventListener("click", () => {
    localStorage.removeItem("leaderboardName")
    localStorage.removeItem("leaderboardScore")
    getLeaderboard()
})

document.getElementById("save-entry").addEventListener("click", () => {
    if(nameEntry.value) {
        leaderboardNameArray.push(nameEntry.value)
        leaderboardScoreArray.push(score)
        localStorage.setItem("leaderboardName", JSON.stringify(leaderboardNameArray))
        localStorage.setItem("leaderboardScore", JSON.stringify(leaderboardScoreArray))
    
        document.getElementById("name-entry").style.display = "none"
        document.getElementById("save-entry").style.display = "none"
        getLeaderboard()
    }
})

function startGame() {
    generateTiles()
    assignValue()
    document.querySelector(".start-screen").style.display = "none"
    document.querySelector(".leaderboard-section").style.display = "none"
    document.querySelector(".game-container").style.display = "flex"
    timer()
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
}

function assignValue() {  
    document.querySelectorAll(".tile").forEach(el => {
        const randomId = Math.floor(Math.random() * imgTiles.length)
        const randomValue = imgTiles[randomId]
        imgTiles.splice(randomId, 1)
        el.value = randomValue        
    })
}

function counter() {
    countNumber ++
    clicksEl.textContent = "Clicks: " + countNumber

}

function resetTiles(arr) {
    document.getElementById(arr[0]).textContent = "?"
    document.getElementById(arr[1]).textContent = "?"

    document.getElementById(arr[0]).disabled = false
    document.getElementById(arr[1]).disabled = false
}

function check() {
    
    elClickCounter ++

    this.textContent = this.value
    valuesArr.push(this.value)
    idArr.push(this.id)

    this.disabled = true

    if(elClickCounter === 2) {
        if(valuesArr[0] != valuesArr[1]) {
            setTimeout(resetTiles, 750, idArr) 
        } else {
            score += 10
            completeBoard ++
            scoreEl.textContent = `Score: ${score}`
            if(completeBoard === boardLength) {
                setTimeout(newBoard, 750)
            }
        }
        valuesArr = []
        idArr = []
        elClickCounter = 0
    }
}

function newBoard() {
    valuesArr = []
    idArr = []
    level ++
    completeBoard = 0
    maxTicks += 15
    document.querySelectorAll(".tile").forEach(el => {
        el.textContent = "?"
        el.disabled = false
    })
    if(level >= 3) {
        imgTiles = ["👽", "👽", "🤖", "🤖", "😁", "😁", "🤓", "🤓", "🦞", "🦞", "🚗", "🚗", "👻", "👻", "🥶", "🥶", "😺", "😺"]
        document.querySelector(".tiles-container").classList.add("tiles-container-3")
    } else {
        imgTiles = ["👽", "👽", "🤖", "🤖", "😁", "😁", "🤓", "🤓", "🦞", "🦞", "🚗", "🚗"]
    }
    tiles = imgTiles.length
    generateTiles()
    boardLength = imgTiles.length / 2
    assignValue()
    document.getElementById("level").textContent = `Level: ${level}`
}

function resetGame() {
    valuesArr = []
    idArr = []
    level = 1
    elClickCounter = 0
    countNumber = 0
    score = 0
    completeBoard = 0
    maxTicks = 90
    scoreEl.textContent = `Score: ${score}`
    clicksEl.textContent = "Clicks: " + countNumber
    document.querySelectorAll(".tile").forEach(el => {
        el.textContent = "?"
        el.disabled = false
    })
    document.querySelector(".tiles-container").classList.remove("tiles-container-3")
    imgTiles = ["👽", "👽", "🤖", "🤖", "😁", "😁", "🤓", "🤓", "🦞", "🦞", "🚗", "🚗"]
    tiles = imgTiles.length
    generateTiles()
    boardLength = imgTiles.length / 2
    assignValue()
    clearInterval(myInterval)
    timer()
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
}

function timer(){
    let min = 0
    let sec = 0
    
    const tick = function()
    {
        if (maxTicks === 0) {
            document.querySelectorAll(".tile").forEach(el => {
                el.disabled = true
            })
            setTimeout(endGame, 1500)
            document.getElementById("timer").innerHTML = `Time left: &nbsp; 0 : 00`;
            clearInterval(myInterval);
            return;
        }
    
        if(maxTicks >= 0) {
            min = Math.floor(maxTicks / 60)
            sec = maxTicks % 60
        }

        if(sec < 10) {
            document.getElementById("timer").innerHTML = `Time left: &nbsp; ${min} : 0${sec}`;
        } else {
            document.getElementById("timer").innerHTML = `Time left: &nbsp; ${min} : ${sec}`;
        }
    
        maxTicks --;
    };
    
    myInterval = setInterval(tick, 1000);
}

function generateTiles() {
    document.querySelector(".tiles-container").innerHTML = ""
    for(let i = 0; i < tiles; i++) {
        const tile = document.createElement("button")
        tile.classList.add("tile")
        tile.textContent = "?"
        tile.id = `tile-${i}`
        document.querySelector(".tiles-container").append(tile)
    }
    document.querySelectorAll(".tile").forEach(el => {
        el.addEventListener("click", counter)
    })
    document.querySelectorAll(".tile").forEach(el => {
        el.addEventListener("click", check)
    })
}

function endGame() {
    document.querySelector(".game-container").style.display = "none"
    document.querySelector(".leaderboard-section").style.display = "block"
    if(score > 0) {
        document.getElementById("name-entry").style.display = "block"
        document.getElementById("name-entry").value = ""
        document.getElementById("save-entry").style.display = "block"
    }
    getLeaderboard()
}

function getLeaderboard() {
    leaderboardNameContainer.textContent = ""
    leaderboardScoreContainer.textContent = ""

    leaderboardNameArray = JSON.parse(localStorage.getItem("leaderboardName"))
    leaderboardScoreArray = JSON.parse(localStorage.getItem("leaderboardScore"))

    if(!leaderboardNameArray) {
        leaderboardNameArray = []
    }
    if(!leaderboardScoreArray) {
        leaderboardScoreArray = []
    }

    if(leaderboardScoreArray.length === 0) {
        leaderboardContainer.textContent = "Empty"
    } else {
        sortLeaderboard()
        for(const nameEl of leaderboardNameArray) {
            const nameEntry = document.createElement("p")
            nameEntry.textContent = nameEl
            leaderboardNameContainer.append(nameEntry)
        }
        for(const scoreEl of leaderboardScoreArray) {
            const scoreEntry = document.createElement("p")
            scoreEntry.textContent = scoreEl
            leaderboardScoreContainer.append(scoreEntry)
        }
        leaderboardContainer.textContent = ""
        leaderboardContainer.append(leaderboardNameContainer)
        leaderboardContainer.append(leaderboardScoreContainer)
    }
 
}

function sortLeaderboard() {
    if(leaderboardScoreArray.length > 1) {
        for(let i = 0; i < leaderboardScoreArray.length - 1; i++) {
            for(let j = i + 1; j < leaderboardScoreArray.length; j++) {
                if (leaderboardScoreArray[i] < leaderboardScoreArray[j]) {
                    const scoreCopy = leaderboardScoreArray[i]
                    leaderboardScoreArray[i] = leaderboardScoreArray[j]
                    leaderboardScoreArray[j] = scoreCopy

                    const nameCopy = leaderboardNameArray[i]
                    leaderboardNameArray[i] = leaderboardNameArray[j]
                    leaderboardNameArray[j] = nameCopy
                }
            }
        }
    }
}