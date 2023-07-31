"use strict";
const EMOJIS_LENGTH = 9;

// list of all possible emojis
const emojisList = [
  "❤",
  "😊",
  "👌",
  "🎶",
  "🌹",
  "🤷‍♀️",
  "😒",
  "🤢",
  "🤣",
  "💖",
  "🎂",
  "🤦",
  "😁",
  "🐱‍🐉",
  "💋",
  "👀",
  "😎",
  "😣",
  "😛",
  "😴",
  "🎉",
  "🎨",
  "🎀",
  "🎄",
  "🍙",
  "🍜",
  "🍱",
  "🥨",
  "😙",
  "🤗",
  "💚",
  "💔",
  "🥙",
  "🍖",
  "🧀",
  "🍿",
  "🍕",
  "🧂",
  "🥯",
  "🤐",
  "🏓",
  "🎻",
  "🥼",
  "🎪",
  "🧧",
  "😵",
  "🙏",
  "👋",
  "🚽",
  "💃",
  "💎",
  "🚀",
  "🌙",
  "⛄",
  "🌊",
  "⛵",
  "🏀",
  "🎱",
  "💰",
  "👶",
  "👸",
  "🐰",
  "🐷",
  "🐍",
  "🐫",
];
const gameBtn = document.querySelector(".btn-game");
const gameContainerEl = document.querySelector(".game-container");
let emojis;
let chosenEmojis;
let content = "";
let check;
let match;
let cardsFlipped;
let twoCards;
let cardsEl;

const start = () => {
  gameContainerEl.innerHTML = "";
  emojis = new Array();
  chosenEmojis = new Array(emojisList.length).fill(0);
  content = "";
  // chooses the emojis randomly
  for (let i = 0; i < EMOJIS_LENGTH; i++) {
    let changed = false;
    do {
      const ind = Math.floor(Math.random() * emojisList.length);
      if (chosenEmojis[ind] === 0 && !changed) {
        emojis.push(emojisList[ind]);
        chosenEmojis[ind] = 1;
        changed = true;
      }
    } while (!changed);
  }
  check = new Array(emojis.length).fill(0);

  // adds the cards to the page
  for (let i = 0; i < emojis.length * 2; i++) {
    let changed = false;
    do {
      const ind = Math.floor(Math.random() * emojis.length);
      if (check[ind] < 2 && !changed) {
        check[ind] = check[ind] + 1;
        changed = true;
        content += `<div class="card card--${ind} card--${ind}-${i} flip">
                        <span class="icon hide">${emojis[ind]}</span>
                     </div>`;
      }
    } while (!changed);
  }
  gameContainerEl.innerHTML += content;

  match = 0;
  cardsFlipped = 0;
  twoCards = new Array();
  cardsEl = document.querySelectorAll(".card");

  // transition to flip cards when clicked
  cardsEl.forEach((card) => {
    card.addEventListener("click", () => {
      if (cardsFlipped < 2) {
        const iconClass = card.classList[2];
        const iconEl = document.querySelector(`.${iconClass} .icon`);
        iconEl.classList.toggle("hide");
        card.classList.toggle("flip");
        cardsFlipped++;
        twoCards.push(card);
        checkMatch();
      }
    });
  });
};

start();

// check if the two flipped cards are a match
const checkMatch = function () {
  if (cardsFlipped === 2) {
    // the two cards match
    if (twoCards[0].classList[1] === twoCards[1].classList[1]) {
      twoCards[0].classList.toggle("no-event");
      twoCards[1].classList.toggle("no-event");
      match++;
      twoCards.pop();
      twoCards.pop();
      cardsFlipped = 0;
      if (match === EMOJIS_LENGTH) {
        document.querySelector(".game-container").classList.toggle("won");
      }
    } else {
      setTimeout(() => {
        document
          .querySelector(`.${twoCards[0].classList[2]} .icon`)
          .classList.toggle("hide");
        twoCards[0].classList.toggle("flip");
        document
          .querySelector(`.${twoCards[1].classList[2]} .icon`)
          .classList.toggle("hide");
        twoCards[1].classList.toggle("flip");
        twoCards.pop();
        twoCards.pop();
      }, 900);
      flipCard();
    }
  }
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// ensures that the cards are flipped back before allowing user to click
const flipCard = async () => {
  await delay(950);
  cardsFlipped = 0;
};

// restarts game
gameBtn.addEventListener("click", () => {
  cardsEl.forEach((card) => {
    if (!card.classList.contains("flip")) {
      document
        .querySelector(`.${card.classList[2]} .icon`)
        .classList.toggle("hide");
      card.classList.toggle("flip");
    }
    if (card.classList.contains("no-event")) {
      card.classList.toggle("no-event");
    }
  });
  if (document.querySelector(".game-container").classList.contains("won")) {
    document.querySelector(".game-container").classList.toggle("won");
  }
  start();
});
