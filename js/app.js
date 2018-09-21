// Create a list that holds all of your cards
const cardList = document.getElementsByClassName('card');
const TOTALCARDS = cardList.length;

//Working variables
let flippedCard = null, //Stores first card
    evaluator = false,
    movements = 0,
    lock = false,
    timer = null,
    points = 0,
    seconds = 0;

//Get elements

const modal = document.getElementById('myModal');
const playAgain = document.getElementsByClassName('playAgain')[0];
const resetButton = document.querySelector('.restart')
const starsP = document.querySelector('.stars');

updateDisplay();

// Create an array with pairs
let idList = Array.from(cardList).map((e, i) => (i < TOTALCARDS / 2) ? i : (TOTALCARDS - i - 1));


//Icons used to play the game
const icons = [
    'diamond',
    'paper-plane-o',
    'anchor',
    'bolt',
    'cube',
    'leaf',
    'bicycle',
    'bomb'
];

//Event listeners
for (let card of cardList) {
    let idRemove = Math.floor(Math.random() * (idList.length - 1)); //Shuffle
    card.cardId = idList.splice(idRemove, 1)[0]; //Remove from array and return the right ID
    card.flipped = false;
    card.solved = false;
    const child = card.firstElementChild;
    const className = 'fa-' + icons[card.cardId];
    child.classList.add(className);
    card.addEventListener('click', evt => {
        if (timer == null){
            startTimer();
        }
        if (!evt.target.flipped && !lock) {
            flip(this.event.target);
            if (!evaluator) { //If it's the first card of the turn
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
                    setTimeout(()=>{ //
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

playAgain.onclick = function() {
    modal.style.display = 'none';
    reset(0);
}


//Functions

function flip(card) {
    card.classList.toggle('show');
    card.classList.toggle('open');
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

//Win the game and display the modal
function win() {
    clearInterval(timer);
    modal.style.display = 'block';
}

//Reset the game (just refresh the page)
function reset() {
    location.reload();
}

//Set the stars for the score
function rate() {
    if (movements == 11) {
        starsP.children[2].classList.toggle('minus-score');
    }
    if (movements == 16) {
        starsP.children[1].classList.toggle('minus-score');
    }
    if (movements == 20) {
        starsP.children[0].classList.toggle('minus-score');
    }
}

//Update the HUD (just the moves counter)
function updateDisplay() {
    document.querySelector('.moves').innerText = movements;
}

//Starts the timer and update the DOM.
function startTimer(){
    timer = setInterval(()=>{
        document.querySelector('.timer').innerText = ++ seconds;
    }, 1000);
}