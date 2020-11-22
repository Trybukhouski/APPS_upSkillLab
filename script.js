const holes = document.querySelectorAll('.hole'),
      scoreBoard = document.querySelector('.score'),
      moles = document.querySelectorAll('.mole'),
      startBtn = document.querySelector('.start');
  let lastHole,
      timeUp = false,
      score = 0;

  let randomTime = (min, max) => Math.round(Math.random() * (max - min) + min);

  function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length),
          hole = holes[idx];
    if (hole === lastHole) randomHole(holes);
    lastHole = hole;
    return hole;
  }

  function peep() {
    const time = randomTime(200, 1000),
          hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  }

  function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
  }

  function bonk(el) {
    if(!el.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }
  
  startBtn.addEventListener('click', startGame);
  moles.forEach(mole => mole.addEventListener('click', bonk));