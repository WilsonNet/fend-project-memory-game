/*
 * Create a list that holds all of your cards
 */
cardList = document.getElementsByClassName("card");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
let idList = Array.from(cardList).map((e, i)=>i);
/*let idList = map(cardList, i=>i);

idList.forEach(element => {
    console.log(element);    
});*/

//Add event listeners
for (card of cardList){
    idRemove = Math.floor(Math.random() * (idList.length - 1));
    card.cardId=idList.splice(idRemove, 1)[0];
    card.addEventListener("click", (evt)=>{
        console.log(evt.target.cardId);    
    });
}
