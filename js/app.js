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
let flippedCard = null,
    evaluator = false,
    movements = 0,
    stars = 3;
    points = 0;


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
        if (!evt.target.solved) {
            card.flipped = true;
            if (!evaluator) {
                flippedCard = evt.target;
                evaluator = true;
            } else {
                evaluator = false;
                if (evt.target.cardId === flippedCard.cardId) {
                    evt.targed.solved = true;
                    flippedCard.solved = true;
                } else {
                    fail();
                    evt.target.flipped = false;
                    flippedCard.flipped = false;
                }
                newMove();
            }
        }
    });
}

function newMove(){
    movements +=1;
    evaluator = false;
    flippedCard = null;
    rate();    
}

function rate() {
    if (movements <=10){
        stars = 3;
    } else if (movements <= 14){
        stars = 2;
    } else {
        stars = 1;
    }
}


//complementar = total -

function fail() {
    console.log("Não foi dessa vez");
}

/*
button.addEventListener("click", doThings);

function doThings(event, parameterA, parameterB);*/