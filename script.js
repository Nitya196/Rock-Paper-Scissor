(function() {
  // ----- state -----
  let playerScore = 0;
  let computerScore = 0;
  let currentPlayerPick = null;     // 'rock', 'paper', 'scissors'
  let currentComputerPick = null;

  // DOM elements
  const playerScoreEl = document.getElementById('player-score');
  const computerScoreEl = document.getElementById('computer-score');
  const playerPickEl = document.getElementById('player-pick');
  const computerPickEl = document.getElementById('computer-pick');
  const resultMessageEl = document.getElementById('result-message');

  // move emojis & labels
  const moveMap = {
    rock:     { emoji: '🪨', label: 'Rock' },
    paper:    { emoji: '📄', label: 'Paper' },
    scissors: { emoji: '✂️', label: 'Scissors' }
  };

  // ----- helper functions -----
  function getRandomMove() {
    const moves = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  }

  // determine winner: returns 'player', 'computer', or 'draw'
  function getWinner(playerMove, computerMove) {
    if (playerMove === computerMove) return 'draw';

    if (
      (playerMove === 'rock' && computerMove === 'scissors') ||
      (playerMove === 'paper' && computerMove === 'rock') ||
      (playerMove === 'scissors' && computerMove === 'paper')
    ) {
      return 'player';
    }
    return 'computer';
  }

  // update the UI with current state (scores, picks, result)
  function updateUI(result, playerMove, computerMove) {
    // update scores
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;

    // update picks (show emoji + label)
    if (playerMove && moveMap[playerMove]) {
      const p = moveMap[playerMove];
      playerPickEl.textContent = `${p.emoji} ${p.label}`;
    } else {
      playerPickEl.textContent = '—';
    }

    if (computerMove && moveMap[computerMove]) {
      const c = moveMap[computerMove];
      computerPickEl.textContent = `${c.emoji} ${c.label}`;
    } else {
      computerPickEl.textContent = '—';
    }

    // update result message
    if (result === 'player') {
      resultMessageEl.innerHTML = '🎉 You win this round!';
    } else if (result === 'computer') {
      resultMessageEl.innerHTML = '💻 Computer wins this round!';
    } else if (result === 'draw') {
      resultMessageEl.innerHTML = '🤝 It\'s a draw!';
    } else {
      resultMessageEl.innerHTML = '✨ Choose your move';
    }
  }

  // core game logic: called when player makes a move
  function playRound(playerMove) {
    // computer picks random
    const computerMove = getRandomMove();
    const winner = getWinner(playerMove, computerMove);

    // update scores based on winner
    if (winner === 'player') {
      playerScore += 1;
    } else if (winner === 'computer') {
      computerScore += 1;
    }
    // draw: no score change

    // save current picks for display
    currentPlayerPick = playerMove;
    currentComputerPick = computerMove;

    // update UI with result
    updateUI(winner, playerMove, computerMove);
  }

  // ----- reset game -----
  function resetGame() {
    playerScore = 0;
    computerScore = 0;
    currentPlayerPick = null;
    currentComputerPick = null;

    // reset UI (no result, empty picks)
    updateUI(null, null, null);
    // extra: set pick displays to '—' explicitly (updateUI handles null)
    playerPickEl.textContent = '—';
    computerPickEl.textContent = '—';
    resultMessageEl.innerHTML = '✨ Choose your move';
    // scores already set to 0 via updateUI
  }

  // ----- event listeners -----
  function init() {
    // get all choice buttons
    const choiceButtons = document.querySelectorAll('.choice-btn');
    choiceButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        const move = this.dataset.move; // 'rock', 'paper', 'scissors'
        if (move && ['rock', 'paper', 'scissors'].includes(move)) {
          playRound(move);
        }
      });
    });

    // reset button
    const resetBtn = document.getElementById('reset-btn');
    resetBtn.addEventListener('click', resetGame);

    // initial state
    resetGame(); // ensure clean start
  }

  // run when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
