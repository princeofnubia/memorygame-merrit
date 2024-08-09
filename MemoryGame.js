const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let lowestScore = localStorage.getItem('lowestScore') || Infinity;

function createDivsForColors(colorArray){
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  if (lockBoard) return;

  const clickedCard = event.target;
  if (clickedCard === firstCard) return;

  clickedCard.style.backgroundColor = clickedCard.classList[0];

  if (!firstCard){
    firstCard = clickedCard;
    return;
  }


  secondCard = clickedCard;

  if (firstCard.classList[0] === secondCard.classList[0]) {
    firstCard.removeEventListener('click', handleCardClick);
    secondCard.removeEventListener('click', handleCardClick);
    score++;
    document.getElementById('score').innerText = `Score: ${score}`;
    resetCards();}
    else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.style.backgroundColor = '';
      secondCard.style.backgroundColor = '';
      resetCards();
    }, 1000);
  }
}

function resetCards(){
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function startGame(){
  score = 0;
  document.getElementById('score').innerText = `Score: ${score}`;
  shuffledColors = shuffle(COLORS);
  gameContainer.innerHTML = '';
  createDivsForColors(shuffledColors);
}

function restartGame(){
  if (score < lowestScore){
    localStorage.setItem('lowestScore', score);
  }
  startGame();
}

function initializeGame(){
  document.getElementById('startButton').addEventListener('click', startGame);
  document.getElementById('restartButton').addEventListener('click', restartGame);
}

initializeGame();