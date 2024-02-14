const gameResult = document.getElementById('game-result')
const computerChoice = document.getElementById('computer-choice');
const computerScore = document.getElementById('computer-score');
const playerChoice = document.getElementById('player-choice');
const playerScore = document.getElementById('player-score')
const winnerText = document.getElementById('winnerText')
const instruction = document.getElementById('instruction')
const controlBtns = document.querySelectorAll('#controls > button')
const restartGameBtn = document.getElementById('restart-game-btn')

let isGameEnded = false
function getComputerChoice() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function newGame() {
  isGameEnded = false
  computerScore.textContent = '0'
  playerScore.textContent = '0'
  computerChoice.textContent = ''
  playerChoice.textContent = ''
  winnerText.textContent = ''
  instruction.innerHTML = '<em>Make a move...<em>'
  gameResult.before(instruction)
}

function playRound(e) {
  if (isGameEnded) return

  const computerSelection = getComputerChoice();
  const playerSelection = e.target.id;
  computerChoice.textContent = `Computer Choice: ${computerSelection}`
  playerChoice.textContent = `Your Choice: ${playerSelection}`
  if (playerSelection === computerSelection) {
    winnerText.textContent = "It's a Tie";
  } else if (
    (playerSelection === 'Rock' && computerSelection === 'Scissors') ||
    (playerSelection === 'Paper' && computerSelection === 'Rock') ||
    (playerSelection === 'Scissors' && computerSelection === 'Paper')
  ) {
    playerScore.textContent++;
    winnerText.textContent = 'You win!';
  } else {
    computerScore.textContent++
    winnerText.textContent = 'Computer win!';
  }

  if (playerScore.textContent === '5' || computerScore.textContent === '5') {
    isGameEnded = true
    const theWinner = playerScore.textContent > computerScore.textContent ? 'You' : "Computer"
    instruction.innerHTML = `Game Has Ended. <strong>${theWinner}</strong> Won this First-to-Five Round.
      <button onclick='newGame()'>Play Again</button>`
    /*const playAgainBtn = document.createElement('button')
    playAgainBtn.textContent = 'Play Again'
    playAgainBtn.addEventListener('click',newGame)
    instruction.append(playAgainBtn)*/
  } else {
    instruction.innerHTML = '<em>Make a move...</em>'
  }
  gameResult.after(instruction)
}


controlBtns.forEach(btn => btn.addEventListener('click', playRound))

restartGameBtn.addEventListener('click', () => {
  if (isGameEnded || confirm('Are You Sure You want to Restart This Game?')) {
    newGame()
  }
})
