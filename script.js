const speed = document.querySelector('.speed'),
  speedBar = speed.querySelector('.speed-bar'),
  video = document.querySelector('.movie');

function moveTheSpeed(el) {
  const y = el.pageY - this.offsetTop,
    percent = y / this.offsetHeight,
    min = 0.4,
    max = 4,
    height = Math.round(percent * 100) + '%',
    playbackRate = percent * (max - min) + min;

  speedBar.style.height = height;
  speedBar.textContent = playbackRate.toFixed(2) + 'x';
  video.playbackRate = playbackRate;
}

speed.addEventListener('mousemove', moveTheSpeed);

  // Need to remember:
  // - .pageY
  // - .offsetTop
  // - .offsetHeight
  // - .textContent
  // - алгоритм кода