'use strict';

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
    'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';
const WALKING_CAT_URL =
    'http://www.anniemation.com/clip_art/images/cat-walk.gif';
let CURRENT_POS = 0;

function walk(img, stopPos) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      img.style.left = `${CURRENT_POS += STEP_SIZE_PX}px`;

      if (CURRENT_POS >= stopPos) {
        clearInterval(interval);
        resolve();
      }
    }, STEP_INTERVAL_MS);
  });
}

function dance(img) {
  return new Promise((resolve) => {
    img.src = DANCING_CAT_URL;

    setTimeout(() => {
      img.src = WALKING_CAT_URL;
      resolve();
    }, DANCE_TIME_MS);
  });
}

function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = Math.floor(((window.innerWidth - img.width) / 2) / 10) * 10;
  const stopPos = window.innerWidth + startPos;

  async function movement() {
    while (true) {
      try {
        await walk(img, centerPos).then(() => dance(img)).then(() => walk(img, stopPos)).then(() => CURRENT_POS = 0);
      }
      catch (err) {
        console.error(err);
      }
    }
  }
  async function loop() {
    await movement();
  }
  loop();
}

window.addEventListener('load', catWalk);