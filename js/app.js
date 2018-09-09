// Create a list that holds all of your cards
cardList = document.getElementsByClassName("card");
const TOTALCARDS = cardList.length;

//Global checkers
let cardA = null,
    evaluator = false;


// Create an array with pairs
let idList = Array.from(cardList).map((e, i) => (i < TOTALCARDS / 2) ? i : (TOTALCARDS - i - 1));

/*let idList = map(cardList, i=>i);

idList.forEach(element => {
    console.log(element);    
});*/

//Add event listeners
for (card of cardList) {
    idRemove = Math.floor(Math.random() * (idList.length - 1));
    card.cardId = idList.splice(idRemove, 1)[0];
    card.flipped = false;
    card.addEventListener("click", flipCard);
}

function flipCard(evt) {
    card.flipped = true;
    if (!evaluator) {
        cardA = evt.target;
        evaluator = true;
    } else {
        evaluator = false;
        if (evt.target.cardId === cardA.cardId) {
            score();
        } else {
            fail();
            evt.target.flipped = false;
            cardA.flipped = false;
        }
        cardA = null;
        evaluator = false;
    }
}

//complementar = total -

function score() {
    console.log("você pontuou");
}

function fail() {
    console.log("Não foi dessa vez");
}