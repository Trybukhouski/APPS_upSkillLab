//Events
const keys = document.querySelectorAll('.key');
window.addEventListener('keydown', playAudio);
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

//Playing
function playAudio(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;

  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
};

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
};
