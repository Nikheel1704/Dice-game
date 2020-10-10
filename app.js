/*state variable-tells us the conditionof the system and we need state variable when we need to remember something or state of smething and in this case this will be is our game playing or is our game not playing?so we will simply create a vatiable that tells us this and we can then use it in our function
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores,roundScore,activePlayer,dice,gamePlaying;/*when we start our application,gameplaying variable will be set to true.*/
init();/*initializing the variables*/
console.log(dice);
//document.querySelector('#current-'+ activePlayer/*it means the text will be put to the element of id current 0 or current 1 according to the value of active player*/).textContent=dice;/*it lets us select exactly the way we do in css.only difference is that it only selects the first element that it finds.we selected the element with its id.last line means that the text in the selected place will be the value that is in the dice*/
//document.querySelector('#current-'+activePlayer).innerHTML='<em>'+dice+'</em>';/*we used inner html and if we dont take it as string then js parser think that it is a js code.and we dont wanted our text to be plain text so we used html here..we did our first dom manipulation as we used query selector method  to manipulate or change values and element of our webpage*/
//var x=document.querySelector('#score-0').textContent;/*this is just to read the content of the element of this id score 0 and score it in variable x*/
//console.log(x);
/*we can use query selector in order to change the css property as well*/
document.querySelector('.dice').style.display='none';/*it means that we selected the element having this class name and set the css property i.e. dont display*/

//function btn(){}
//document.querySelector('.btn-roll').addEventListener('click'/*event type*/,btn)/*first arguement in the event listener will be the type of event and the second will be the function that will be called as soon as the event happens.we dont use parenthesis as we dont want to call it right here.we want the event listener to call the function for us and this btn is then called the callback function and thats the function that is not called by us but by another funvtion.so this is what a callback function is.the function that we pass into another function as an arguement and the event listener function call that function for us */
//or we can use anonymous func which dont have a name and is used only once
document.querySelector('.btn-roll').addEventListener('click',function(){
    //1.random number
    if(gamePlaying){/*we want all this to happen when the game is playing which means we didnt got our winner yet so when game is playing then the gameplaying var will be true and when we get our winner then it will be set to false*/
   var dice=Math.floor(Math.random()*6)+1;/*math object is a js built in object which has a lot of properties and methods for mathematical constants and functions.what this does is that at math.random() it will generate any random number between 0 and 1 and we multiplied it by 6 so it gives no. between 0 and 6(means 0 to 5)and we passed it to floor function with converts it to int i.e 4.6=4 and then we add 1 so that we can get number from 1 to 6*/
    
    //2.display the result
    var diceDOM=document.querySelector('.dice');
   diceDOM.style.display='block';/*when we click then the dice is visible*/
    diceDOM.src="dice-"+dice+'.png';/*this means that whenever we do click thenthis function is called and displays the dice pic and change the image as per the value of dice*/
    //3.update the round score if the rolled number was not a 1 
    if(dice!=1/*performs type coersion*/){
        //add score
    roundScore+=dice;
        document.querySelector('#current-'+activePlayer).textContent=roundScore;/*if the active player is no. 0 then the current 0 element will get the text content and if its playe one then it will get and the content that we want is roundscore.so each time after the dice rolls we want to update the round score and then display the round score in our user interface*/ 
    }
    else{
        //next player turn
       
        nextPlayer();
    }}
});
document.querySelector('.btn-hold').addEventListener('click',function(){
    /*we can hold only when then game is playing*/
    if(gamePlaying)
        {
    //add current score to the global score
    scores[activePlayer]+=roundScore;/*as it is an array so when the value of activeplayer is one then at index 1 of scores round score is added*/
    //update the score
    document.querySelector('#score-'+activePlayer).textContent=scores[activePlayer];/*if it is the first player,it will be the first element of the arrray and if second then it would be the second element of array*/

    /*we follow dry principle which means we should not repeat ourselves in code*/
    //check if the player won the game when we user clicks the hold button
   
    if(scores[activePlayer]>=20){
        document.querySelector('#name-'+activePlayer).textContent='Winner!';
        document.querySelector('.dice').style.display='none';/*if score of any player exceeds by 20 then we want not to show the dice*/
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');/*player that win the game is active player*//*we dont have winner class present so we will add it to player panel class*/
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');/*we have active class present so we will remove it*/
        gamePlaying=false;
    }
    else{
        nextPlayer();
    }
        }
})
function nextPlayer(){
   activePlayer===0?activePlayer=1:activePlayer=0;
        roundScore=0;
        document.getElementById('current-0').textContent='0';
        document.getElementById('current-1').textContent='0';
        document.querySelector('.player-0-panel').classList.toggle('active');/*when any player hits 1 then the active class toggles to another panel*/
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display='none';/*when any player hits 1 then the dice disappears*/ 
    /*we follow dry principle which means we should not repeat ourselves in code*/
}
//document.querySelector('.btn-new').addEventListener('click',function(){init();})/*when we click on new game then the scores get to 0*///we dont want an anonymus function only to call another function.as we set our first event listener  then we can write any function in this arguement.what can we do now is to not call the anonymus function but instead our init func.actually not calling,we are just passing it into the event listener func.if we use like init() or we can say func call then this func is immediately called and we dont want it to happen.we just want to tell the event listener that when someone clicks the button then call init fuction, not without clicking*/
document.querySelector('.btn-new').addEventListener('click',init);/*when we click new button then the gameplaying var is again set to true and we can start our game again*/

function init()/*we call this function as soon as we load the application*/
{
    gamePlaying=true;
    scores=[0,0];/*using an array*/
roundScore=0;
activePlayer=0;/*keeps track of player who is currently playing.0 is for 1st player and 1 is for 2nd player*/
document.getElementById('score-0').textContent="0";/*works fatser than query selector which only work for ids*/
document.getElementById('score-1').textContent='0';
document.getElementById('current-0').textContent='0';

document.getElementById('current-1').textContent='0';/*setting all the 4 values to zero*/
document.querySelector('.dice').style.display='none';
    document.querySelector('#name-0').textContent="Player 1";
    document.querySelector('#name-1').textContent="Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');/*removing winner class as it is previously added*/
    document.querySelector('.player-1-panel').classList.remove('winner');/*we dont know who won the game as we initalzed activeplayer to 0 so we will remove winner class from both the panel classes*/
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');/*we are first removing it and then adding it but imagine that player 0 was the active player then in this case active class would be there and when we add it again without removing then there would be two active classes*/
}