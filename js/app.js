// Todo list
// Congratulations popup
// Restart button
// Star Rating
// Timer
// Win

// Create a list that holds all of your cards
cardList = document.getElementsByClassName("card");
const TOTALCARDS = cardList.length;

//Global checkers
let flippedCard = null, //Stores first card
    evaluator = false,
    movements = 0,
    stars = 3,
    points = 0
    lock = false;;

//Elements
updateDisplay();



// Create an array with pairs
let idList = Array.from(cardList).map((e, i) => (i < TOTALCARDS / 2) ? i : (TOTALCARDS - i - 1));

/*let idList = map(cardList, i=>i);

idList.forEach(element => {
    console.log(element);    
});*/

//Add event listeners
for (card of cardList) {
    idRemove = Math.floor(Math.random() * (idList.length - 1)); //Shuffle
    card.cardId = idList.splice(idRemove, 1)[0];
    card.flipped = false;
    card.solved = false;
    card.addEventListener("click", evt => {
        if (!evt.target.flipped && !lock) {
            flip(this.event.target);
            //console.log(evaluator);
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
                    fail();
                    lock = true;
                    setTimeout(()=>{
                        flip(evt.target);
                        flip(flippedCard);
                        newMove();
                    }, 1500);
                }
            }
        }
    });
}

const icons = [
    "diamond",
    "paper-plane-o",
    "anchor",
    "bolt",
    "cube",
    "leaf",
    "bycicle",
    "bomb"
]
/**
 * 
 * @param {element} card card element to be flipped
 */
function flip(card) {
    card.classList.toggle("show");
    card.classList.toggle("open");
    card.flipped = !card.flipped;
    return icons[2];
}


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
}

function reset() {
    flippedCard = null,
        evaluator = false,
        movements = 0,
        stars = 3;
    points = 0;
}

function rate() {
    if (movements <= 10) {
        stars = 3;
    } else if (movements <= 14) {
        stars = 2;
    } else {
        stars = 1;
    }
}

function updateDisplay() {
    document.getElementById("stars").innerText = "Stars = " + stars;
    document.getElementById("movements").innerText = "Movements = " + movements;
    document.getElementById("points").innerText = "Points = " + points;
}

//complementar = total -

function fail() {
    console.log("Não foi dessa vez");
}

/*
button.addEventListener("click", doThings);

function doThings(event, parameterA, parameterB);*/