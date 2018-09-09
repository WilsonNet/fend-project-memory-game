/*
 * Create a list that holds all of your cards
 */
cardList = document.getElementsByClassName("card");
const TOTAL = cardList.length;

//Global checkers
let cardA = 0, evaluator = false;


// Create an array with pairs
let idList = Array.from(cardList).map((e, i)=>(i < TOTAL/2) ? i : (TOTAL - i - 1));

idList.forEach(e => console.log(e));

/*let idList = map(cardList, i=>i);

idList.forEach(element => {
    console.log(element);    
});*/

//Add event listeners
for (card of cardList){
    idRemove = Math.floor(Math.random() * (TOTAL - 1));
    card.cardId=idList.splice(idRemove, 1)[0];
    card.addEventListener("click", (evt)=>{
        cardPicked = evt.target.cardId;
        if(evaluator){
            cardA == cardPicked;
        }
    });
}

//complementar = total - 