// /*
// GAME RULES:

// - The game has 2 players, playing in rounds
// - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
// - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
// - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
// - The first player to reach 100 points on GLOBAL score wins the game

// */


// sequence flow

// // while(abou.turn){
// //     var num=rollDice(1,6)// return random number betwen 1 and 6
//             //displayrollImg(retrieveimg(num))
// //     if(num!=1){
// //         updateTempScore(num) // update the tempscore by the generated number
// //         if(!checkTurn()){ // check the hold by the user if it is the case turn is off and final score is updated
// //             finaleScore+=tempScore
// tempScore=0
// //         }
// //     }else{
//     //setTimeout to 2 seconds before continue
// //         tempScore=0
//switchTurn(abou)
// //               abou.hold()
// //     }

// // }



var abou = {
    name: "Abou",
    actual: 0,
    current: 0,
    activePlayer: true,
    current_id: "#current-1",
    actual_id: "#actual-1",
    div_id: "#player-1",
    content_id: "#content-1",
    winner_id: "#winner-1",

    updateCurrent: function (val) {
        if (val != 1) {
            this.current += val
            console.log(this.current)
            document.querySelector(this.current_id).textContent = this.current

        } else {
            this.current = 0
            console.log(this.current)
            document.querySelector(this.current_id).textContent = this.current
            this.hold(players)
        }
    },
    updateActual: function () {
        this.actual += this.current
        this.current = 0
        document.querySelector(this.actual_id).textContent = this.actual
        if (parseInt(this.actual) >= 100) {
            console.log("hey hey hye")
            document.querySelector(this.winner_id).textContent = "You Win !!!"
        } else {
            this.hold(players)
            document.querySelector("#dice").style.display='none' 
        }






    },
    hold: function (toPlayerList) {
        this.activePlayer = false
        for (var player of toPlayerList) {
            if (player === this) {
                continue
            } else {
                player.activePlayer = !this.activePlayer
                this.current = 0
                document.querySelector(this.current_id).textContent = this.current
                document.querySelector(this.div_id).classList.toggle("player--1")
                document.querySelector(this.content_id).classList.toggle('player__active')
                document.querySelector(player.div_id).classList.toggle("player--1")
                document.querySelector(player.content_id).classList.toggle('player__active')
                console.log(`${this.name} is holding...`)
                console.log(`${player.name} is playing...`)
                document.querySelector("#dice").style.display='none'
                    
            }
        }



    }
}


var rokya = {
    name: "Rokya",
    actual: 0,
    current: 0,
    current_id: "#current-2",
    actual_id: "#actual-2",
    div_id: "#player-2",
    winner_id: "#winner-2",
    content_id: "#content-2",
    activePlayer: false

}
//function and variable borrowing
rokya.updateCurrent = abou.updateCurrent
rokya.updateActual = abou.updateActual
rokya.hold = abou.hold



function checkActivePlayer(playerList) {
    for (var player of playerList) {
        if (player.activePlayer) {
           
            return player
        }
       
    }
}

function roll_controller(player) {
    document.querySelector("#dice").style.display='inline-block'
    player.updateCurrent(displayRollImg(ctx, rollImg(rollDice(1, 6))))


}



function hold_controller(player) {

    player.updateActual()


}

function rollDice(min, max) {
    var rand = Math.floor((Math.random() * (max - min + 1)) + min)
    console.log(rand)
    return rand

}

function rollImg(val) {
    var rolls = [1, 2, 3, 4, 5, 6]
    for (var roll of rolls) {
        switch (val) {
            case roll:
                return {
                    img: `./dice-${roll}.png`,
                    value: val
                }
                break;
        }
    }
}

function displayRollImg(ctx, data) {
    ctx.setAttribute('src', data.img)
    return data.value

}
console.log(players)


var ctx = document.querySelector("#dice")
var current = document.query
var roll = document.querySelector("#btn-roll")
var hold = document.querySelector("#btn-hold")
var newGame = document.querySelector("#btn-new")
var num
var players = [abou, rokya]
//var startingPlayer=abou


roll.addEventListener('click', function () {    
    roll_controller(checkActivePlayer(players))
})
hold.addEventListener('click', function () {
    hold_controller(checkActivePlayer(players))
})
newGame.addEventListener('click', function () {
    document.querySelector("#dice").style.display='none'
    for (var player of players) {
        player.actual = 0
        document.querySelector(player.actual_id).textContent = player.actual
        document.querySelector(player.current_id).textContent = player.actual
        document.querySelector(player.winner_id).textContent = ""
    }
})
console.log(abou)
console.log(rokya)
console.log(num)