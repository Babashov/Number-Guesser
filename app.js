// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNumber(min,max),
    guessesLeft = 3;

// If you want to uncomment at least line and show in console winning number
// console.log(winningNum) 

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
max.textContent = max;

// Play Again Event Listener
game.addEventListener('mousedown',(e)=>{

  if(e.target.className === 'play-again')
  {
    window.location.reload();
  }
  
})

// Listen for Guess
guessBtn.addEventListener('click',(e)=>{
  let guess = parseInt(guessInput.value);
  // Validate Input
  if(isNaN(guess) || guess < min || guess > max)
  {
    setMessage(`Please enter a valid number between ${min} and ${max}`,'red');
  }

  // Check Won
  if(guess === winningNum)
  {
    gameOver(true,`${guessInput.value} is correct, YOU WIN`);
  }else{
    guessesLeft -= 1;

    if(guessesLeft === 0)
    {
      gameOver(false,`You Lost Game. The winning number is ${winningNum}`);
    }else{
      // Game Continues - answer wrong
      
      // Change Border Color
      guessInput.style.borderColor = 'red';
      // Clear Input
      guessInput.value = '';
      // Set Message
      setMessage(`${guess} is not correct,${guessesLeft} guesses left`,'red');
    }
  }
});

// Game Over
function gameOver(won,msg)
{
  let color;
  won === true ? color = 'green' : color = 'red';
  //Disabled Input
  guessInput.disabled = true;
  // Change Border Color
  guessInput.style.borderColor = color;
  // Set Message
  setMessage(msg);
  // Play Again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Set Message
function setMessage(msg,color)
{
  message.style.color = color;
  message.textContent = msg;
}

// Get Random Winning Numbers
function getRandomNumber(min,max)
{
  return Math.floor(Math.random() * (max-min+1) + min);
}