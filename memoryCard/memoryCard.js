let symbols = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let size = 36;
let rows = 0;
let columns = 6;     
let cardSymbols = [];
let wrongMove = 0;

function startGame(n){
   
    let container = document.getElementById('container');

    cardSymbols = [];
    rows = n;
    container.style.width = (columns * 80) + "px";
    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    container.innerHTML = "";

    size = rows * columns;
    let symbolLen = size / 2;

    for(let i = 0; i < symbolLen; i++){
        let ch = symbols[i];
        let p1 = Math.floor(Math.random() * size);
        while(cardSymbols[p1]){
            p1 = (p1 + 1) % size;
        }
        cardSymbols[p1] = ch;
        let p2 = Math.floor(Math.random() * size);
        while(cardSymbols[p2]){
            p2 = (p2 + 1) % size;
        }
        cardSymbols[p2] = ch;
    }

    let moveCount = 0;
    let symbol1 = "";
    let symbol2 = "";
    let card1 = null;
    let card2 = null;
    let matchedCount = 0;

    for(let i = 0; i < size; i++){
        let symbol = cardSymbols[i];
        let card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("card-index-" + i);
        card.classList.add("card-symbol-" + symbol);
        let isOpen = false;

        card.addEventListener("click", function(e){   
            if(moveCount === 1 && card1 === card){
                return;
            }                 
            moveCount++;
            isOpen = !isOpen;
            if(isOpen){
                card.classList.add("active");
            } else {
                card.classList.remove("active");
            }
            if(moveCount === 1){
                symbol1 = symbol;
                card1 = card;
            }
            if(moveCount === 2){
                
               setTimeout(function(){
                if(isMatched(symbol1, symbol, card1, card)){
                    matchedCount+=2;
                    if(matchedCount>=size){
                        alert("Won");
                        resetFunction()
                    }

                }else{
                    onWrongMove();
                }
                symbol1 = null;
                card1 = null;
                moveCount =0;
            },2000)
            }
        });

        card.innerHTML = `<div class="content">
            <div class="front"></div>
            <div class="back">${symbol}</div>
        </div>`;
        container.append(card);
    }

    setTimeout(()=>{
        let cardElement = document.querySelectorAll('.card');
        for(let cardEl of cardElement){
            cardEl.classList.add("active");
        }
    }, 500);

    setTimeout(()=>{
        let cardElement = document.querySelectorAll('.card');
        for(let cardEl of cardElement){
            cardEl.classList.remove('active');
        }
    }, 3000);
}

function isMatched(s1, s2, card1, card2) {
    if (s1 === s2) {
        card1.querySelector('.content').remove();
        card2.querySelector('.content').remove();
        card1.classList.add('dummy-card');
        card2.classList.add('dummy-card');
        return true;
    } else {
        card1.classList.remove('active');
        card2.classList.remove('active');
       return false;
    }
}

function onWrongMove() {
    wrongMove++;
    if (wrongMove === 1) {
        let star3 = document.querySelector(".star3");
        let gElement = star3.querySelector("g");
        gElement.setAttribute("fill", "black");
        setTimeout(() => {
            alert(3-1," lives left")
        }, 100);
    }
    if (wrongMove === 2) {
        let star2 = document.querySelector(".star2");
        let gElement = star2.querySelector("g");
        gElement.setAttribute("fill", "black");
    }
    if (wrongMove === 3) {
        let star1 = document.querySelector(".star1");
        let gElement = star1.querySelector("g");
        gElement.setAttribute("fill", "black");
    }
    if(wrongMove > 3){
        alert("Game Lost");
        resetFunction();
        wrongMove = 0;
        return;
    }
}

