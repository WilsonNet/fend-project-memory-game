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
                    //fail();
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


//complementar = total

/* function fail() {
    console.log("Não foi dessa vez");
} */ 



/*
button.addEventListener("click", doThings);

function doThings(event, parameterA, parameterB);*/

// Get the modal
const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    reset(0);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
} 


//Functions
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
    setInterval(()=>{
        seconds++;
        document.getElementById("timer").innerText = "Seconds = " + seconds;
    }, 1000);
}