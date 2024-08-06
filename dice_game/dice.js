let isPlayerOneTurn = true;
let player1 = {
    name: "Player 1",
    isEntered: false,
    currentPosistion: -1,
    id: "player-1"
}

let player2 = {
    name: "Player 2",
    isEntered: false,
    currentPosistion: -1,
    id: "player-2"
}

function updateScoreboard() {
    document.getElementById("player1-score").textContent = `${player1.name} Position: ${player1.currentPosistion===-1?'-':player1.currentPosistion}`;
    document.getElementById("player2-score").textContent = `${player2.name} Position: ${player2.currentPosistion===-1?'-':player2.currentPosistion}`;
}

function switchPlayerColor() {
    if (isPlayerOneTurn) {
        document.body.classList.add("player-1-turm")
        document.body.classList.remove("player-2-turm")
        document.getElementById("player1-score").style.backgroundColor = "#8f4cc9";
        document.getElementById("player2-score").style.backgroundColor = "#7573763d"; 
    } else {
        document.body.classList.add("player-2-turm")
        document.body.classList.remove("player-1-turm")
        document.getElementById("player2-score").style.backgroundColor = "#6bccde";
        document.getElementById("player1-score").style.backgroundColor = "#7573763d"; 
    }
}

function roleDice() {
    let img1 = document.querySelector(".p-1");
    let btn = document.querySelector(".btn1");
    let diceNumber = 1;
    switchPlayerColor();


    btn.onclick = () => {
        img1.classList.remove("side-" + diceNumber);

        diceNumber = Math.floor(Math.random() * 6 + 1);

        setTimeout(() => {
            img1.classList.add("side-" + diceNumber);
        }, 300)

        let player = isPlayerOneTurn ? player1 : player2;
        if (diceNumber !== 6) {
            isPlayerOneTurn = !isPlayerOneTurn;
        }else{
            // next oppertunity
        }
        switchPlayerColor();

        
        if (!player.isEntered) {
            if (diceNumber === 1) {
                let movingBall = document.getElementById(player.id);
                let point = points[0];
                movingBall.setAttribute("transform", `translate(${point.x} ${point.y})`);
                movingBall.style.display = "block"
                player.isEntered = true;
                player.currentPosistion = 1;
                let audio = new Audio("sounds/won.mp3");
                audio.play(); 
                updateScoreboard();
            }else{
                // waste
            }
            return;
        } else if (player.currentPosistion + diceNumber > 100) {
            // waste
            return;
        }else{

        }
        setTimeout(()=>{ movePlayer(player,diceNumber) }, 300);


    }
}

function movePlayer(player,diceNumber){
        player.currentPosistion += diceNumber;

        if (player.currentPosistion >= 100) {
            let wonScreen = document.getElementById("won");
            wonScreen.classList.add("won-screen");
            wonScreen.innerHTML = "<span>"+player.name + " wins</span>";
            let audio = new Audio("sounds/won.mp3");
            audio.play(); 
        }

        for (let i = 0; i < ladders.length; i++) {
            let { start, end } = ladders[i];
            if (player.currentPosistion === start) {
                setTimeout(()=>{
                    player.currentPosistion = end;
                    movePlayerTo(player);
                },500);
                let audio = new Audio("sounds/jump.mp3");
                audio.play(); 
            }
        }

        for (let i = 0; i < snakes.length; i++) {
            let { start, end } = snakes[i];
            if (player.currentPosistion === start) {
                let audio = new Audio("sounds/snake.mp3");
                audio.play();  
                setTimeout(()=>{
                    player.currentPosistion = end;
                    movePlayerTo(player);

                },500);
                let audio1 = new Audio("sounds/eat.mp3");
                audio1.play(); 
            }
        }
        movePlayerTo(player)

        updateScoreboard();
    
}

function movePlayerTo(player){
    let movingBall = document.getElementById(player.id);
    let point = points[player.currentPosistion-1];
    let anotherPlayer = player==player1?player2:player1;
    if(anotherPlayer.currentPosistion === player.currentPosistion){
        movingBall.setAttribute("transform", `translate(${point.x+20} ${point.y-10})`);
        let anotherMovingBall = document.getElementById(anotherPlayer.id);
        anotherMovingBall.setAttribute("transform", `translate(${point.x-20} ${point.y+10})`);



    }else{
        movingBall.setAttribute("transform", `translate(${point.x} ${point.y})`);

    }
}
