// Create a list that holds all of your cards
cardList = document.getElementsByClassName("card");
const TOTALCARDS = cardList.length;

//Global checkers
let flippedCard = null, //Stores first card
    evaluator = false,
    movements = 0,
    lock = false,
    timer = null,
    points = 0,
    seconds = 0;

//Elements

const resetButton = document.querySelector(".restart")
const starsP = document.querySelector(".stars");
updateDisplay();

// Create an array with pairs
let idList = Array.from(cardList).map((e, i) => (i < TOTALCARDS / 2) ? i : (TOTALCARDS - i - 1));

/*let idList = map(cardList, i=>i);

idList.forEach(element => {
    console.log(element);    
});*/

const icons = [
    "diamond",
    "paper-plane-o",
    "anchor",
    "bolt",
    "cube",
    "leaf",
    "bicycle",
    "bomb"
]

//Add event listeners to cards
for (card of cardList) {
    idRemove = Math.floor(Math.random() * (idList.length - 1)); //Shuffle
    card.cardId = idList.splice(idRemove, 1)[0];
    card.flipped = false;
    card.solved = false;
    const child = card.firstElementChild;
    const className = "fa-" + icons[card.cardId];
    child.classList.add(className);
    card.addEventListener("click", evt => {
        console.log(timer);
        if (timer == null){
            startTimer();
        }
        if (!evt.target.flipped && !lock) {
            flip(this.event.target);
            if (!evaluator) { //If it's the first card
                flippedCard = evt.target;
                evaluator = true;
            } else { //Else, it's the second card
                evaluator = false;
                if (evt.target.cardId === flippedCard.cardId) {
                    evt.target.solved = true;
                    flippedCard.solved = true;
                    points++;
                    newMove();
                } else {
                    lock = true;
                    setTimeout(()=>{
                        flip(evt.target);
                        flip(flippedCard);
                        newMove();
                    }, 1250);
                }
            }
        }
    });
}

resetButton.addEventListener('click', reset);

const modal = document.getElementById('myModal');

const playAgain = document.getElementsByClassName("restart")[0];


playAgain.onclick = function() {
    modal.style.display = "none";
    reset(0);
}


//Functions

function flip(card) {
    card.classList.toggle("show");
    card.classList.toggle("open");
    card.flipped = !card.flipped;
    return icons[2];
}

//Stats maintenance for each turn

function newMove() {
    movements += 1;
    updateDisplay();
    if (points >= 8) {
        win();
    } else {
        evaluator = false;
        flippedCard = null;
        lock = false;
        rate();
    }
}

function win() {
    console.log("Você venceu");
    modal.style.display = "block";
}

function reset() {
    location.reload();
}

function rate() {
    if (movements == 11) {
        starsP.children[2].classList.toggle("minus-score");
    }
    if (movements == 16) {
        starsP.children[1].classList.toggle("minus-score");
    }
    if (movements == 20) {
        starsP.children[0].classList.toggle("minus-score");
    }
}

function updateDisplay() {
    document.querySelector(".moves").innerText = movements;
}

function startTimer(){
    timer = setInterval(()=>{
        document.querySelector(".timer").innerText = ++ seconds;
    }, 1000);
}