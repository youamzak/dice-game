const newGame = document.getElementById("newGame");
const rollDice = document.getElementById("rollDice");
const hold = document.getElementById("hold");
const rollDiceText = document.getElementById("rollDiceText");
const holdText = document.getElementById("holdText");
const ledCurrentPlayer1 = document.getElementById("ledCurrentPlayer1");
const ledCurrentPlayer2 = document.getElementById("ledCurrentPlayer2");
const namePlayer1 = document.getElementById("namePlayer1");
const namePlayer2 = document.getElementById("namePlayer2");
const globalP1 = document.getElementById("global-p1");
const globalP2 = document.getElementById("global-p2");
const roundP1 = document.getElementById("round-p1");
const roundP2 = document.getElementById("round-p2");
const currentP1 = document.getElementById("currentP1");
const currentP2 = document.getElementById("currentP2");
const dice = document.getElementById("dice");

const lightGrey = "#D3D3D3";
const spaceCadet = "#1A1B41";
const animationColor = "#28B463 ";
const red = "#e74c3c";

let finish = false;

let PlayerInfos = {
  isPlaying: false,
  globalScore: Number,
  currentScore: Number,
};

let player1 = Object.create(PlayerInfos);
let player2 = Object.create(PlayerInfos);

/* Initialization of values and animations */
const initValue = () => {
  finish = false;

  player1.isPlaying = true;
  player2.isPlaying = false;
  player1.globalScore = player2.globalScore = 0;
  player1.currentScore = player2.currentScore = 0;

  namePlayer1.style.color = namePlayer2.style.color = spaceCadet;
  globalP1.style.color = globalP2.style.color = red;

  namePlayer1.style.fontWeight = "500";
  globalP1.style.fontWeight = "500";

  ledCurrentPlayer1.style.fill = red;
  ledCurrentPlayer2.style.fill = spaceCadet;

  rollDiceText.style.color = holdText.style.color = spaceCadet;
  rollDice.style.fill = hold.style.fill = newGame.style.fill = "";

  currentP1.style.background = currentP2.style.background = red;
  currentP1.style.color = currentP2.style.color = spaceCadet;

  globalP1.innerHTML = player1.globalScore.toString();
  globalP2.innerHTML = player2.globalScore.toString();

  roundP1.innerHTML = player1.currentScore.toString();
  roundP2.innerHTML = player2.currentScore.toString();
};
initValue();

/*
Change player's order + control the score 
lostRound means the player got 1
*/
const changePlayer = (lostRound) => {
  if (player1.isPlaying) {
    player1.isPlaying = !player1.isPlaying;
    player2.isPlaying = !player2.isPlaying;

    if(!lostRound){
      player1.globalScore += player1.currentScore;
    }

    player1.currentScore = 0;

    if(player1.globalScore >= 100)
    {
      finish = true
      roundP1.innerHTML = "0";
      globalP1.innerHTML = "100";

      rollDiceText.style.color = holdText.style.color = lightGrey;
      rollDice.style.fill = hold.style.fill = lightGrey;

      currentP1.style.background = animationColor;

    }else{
      globalP1.innerHTML = player1.globalScore.toString();
      roundP1.innerHTML = player1.currentScore.toString();

      namePlayer1.style.fontWeight = "300";
      globalP1.style.fontWeight = "300";

      namePlayer2.style.fontWeight = "500";
      globalP2.style.fontWeight = "500";

      ledCurrentPlayer1.style.fill = spaceCadet;
      ledCurrentPlayer2.style.fill = red;
    }   

    
  } else {
    player1.isPlaying = !player1.isPlaying;
    player2.isPlaying = !player2.isPlaying;

    if(!lostRound){
      player2.globalScore += player2.currentScore;
    }

    player2.currentScore = 0;

     if(player2.globalScore >= 100)
    {
      finish = true
      roundP2.innerHTML = "0";
      globalP2.innerHTML = "100";

      rollDiceText.style.color = holdText.style.color = lightGrey;
      rollDice.style.fill = hold.style.fill = lightGrey;

      currentP2.style.background = animationColor;
    }else{
      globalP2.innerHTML = player2.globalScore.toString();
      roundP2.innerHTML = player2.currentScore.toString();

      namePlayer1.style.fontWeight = "500";
      globalP1.style.fontWeight = "500";

      namePlayer2.style.fontWeight = "300";
      globalP2.style.fontWeight = "300";

      ledCurrentPlayer1.style.fill = red;
      ledCurrentPlayer2.style.fill = spaceCadet;
    } 
  }
};

/* When the new game icone is clicked, the values are initialized */
newGame.addEventListener("click", () => {
  initValue();
});

/* 
Manage of the roll click

*/
rollDice.addEventListener("click", () => {
  if(!finish){
    // Generation of random value
    let diceValues = [1, 2, 3, 4, 5, 6];
    let random = Math.floor(Math.random() * diceValues.length);

    if (player1.isPlaying) {
      player1.currentScore += diceValues[random];
      roundP1.innerHTML = player1.currentScore.toString();

    } else {
      player2.currentScore += diceValues[random];
      roundP2.innerHTML = player2.currentScore.toString();
    }   

    //Animation of the dice
    switch (diceValues[random]) {
      case 1:
        dice.innerHTML = dices.one;
        break;
      case 2:
        dice.innerHTML = dices.two;
        break;
      case 3:
        dice.innerHTML = dices.three;
        break;
      case 4:
        dice.innerHTML = dices.four;
        break;
      case 5:
        dice.innerHTML = dices.five;
        break;
      case 6:
        dice.innerHTML = dices.six;
        break;
      default:
        break;
    }

    //If the dice is on 1, then current player's turn is over
    if (diceValues[random] == 1) changePlayer(true);
  }
});

hold.addEventListener("click", () => {
  if(!finish)
    changePlayer(false);
});
