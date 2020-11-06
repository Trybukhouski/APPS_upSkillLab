const player = document.querySelector('.player'),
  video = player.querySelector('.viewer'),
  progress = player.querySelector('.progress'),
  progressBar = player.querySelector('.progress__filled'),
  toggle = player.querySelector('.toggle'),
  skipButtons = player.querySelectorAll('[data-skip]'),
  ranges = player.querySelectorAll('.player__slider');

function playAndStop() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}
toggle.addEventListener('click', playAndStop)
video.addEventListener('click', playAndStop);

function changeButton() {
  const icon = this.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}
video.addEventListener('play', changeButton);
video.addEventListener('pause', changeButton);

function interval() {
  video.currentTime += parseFloat(this.dataset.skip);
}
skipButtons.forEach(el => el.addEventListener('click', interval));

function updateRange() {
  video[this.name] = this.value;
}
ranges.forEach(el => el.addEventListener('change', updateRange));
ranges.forEach(el => el.addEventListener('mousemove', updateRange));

function showProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
video.addEventListener('timeupdate', showProgress);

function scrub(e) {                                                         //need to discuss
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);