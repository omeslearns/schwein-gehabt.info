// Import stylesheets
import './style.css';

const aliveSrc = '🐷';
const deadSrc = '🍖';

let yearMillis = 365 * 24 * 60 * 60 * 10;
let deathsPerYear = 52000000;
let deathMillis = Math.ceil(yearMillis / deathsPerYear);

let refillSize = 1;
let batchSize = 13;
let kills = 0;

let upNext = [];

function kill() {
  let container = document.querySelector('#schlachthof');

  if (upNext.length <= refillSize) {
    for (let i = 0; i < batchSize; i++) {
      let next = document.createElement('span');
      next.innerHTML = aliveSrc;
      upNext.push(next);
      container.appendChild(next);
      container.insertBefore(next, container.firstChild);
    }
  }

  let next = upNext.shift();
  next.innerHTML = deadSrc;

  kills++;
  document.querySelector('#counter').textContent = kills;
}

function setInterval2(callback, millis) {
  let lastExecution = new Date().getTime();

  window.setInterval(function () {
    let now = new Date().getTime();

    if (now < lastExecution) {
      lastExecution = now;
    }

    while (lastExecution + millis < now) {
      callback();
      lastExecution += millis;
    }
  }, Math.floor(millis / 50));
}

setInterval2(kill, deathMillis);
