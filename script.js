const cards = document.querySelectorAll('.cards');
const container = document.querySelector('.container');

// массив с рубашками
const cardBacks = [
  "images/CardBacks.jpg",
  "images/CardBacks.jpg",
  "images/CardBacks.jpg"
];

// массив с реальными картами
const cardFaces = [
  "images/00-TheFool.jpg",
  "images/01-TheMagician.jpg",
  "images/02-TheHighPriestess.jpg",
  "images/03-TheEmpress.jpg",
  "images/04-TheEmperor.jpg",
  "images/05-TheHierophant.jpg",
  "images/06-TheLovers.jpg",
  "images/07-TheChariot.jpg",
  "images/08-Strength.jpg",
  "images/09-TheHermit.jpg",
  "images/10-WheelOfFortune.jpg",
  "images/11-Justice.jpg",
  "images/12-TheHangedMan.jpg",
  "images/13-Death.jpg",
  "images/14-Temperance.jpg",
  "images/15-TheDevil.jpg",
  "images/16-TheTower.jpg",
  "images/17-TheStar.jpg",
  "images/18-TheMoon.jpg",
  "images/19-TheSun.jpg",
  "images/20-Judgement.jpg",
  "images/21-TheWorld.jpg",
  "images/CardBacks.jpg",
  "images/Cups01.jpg",
  "images/Cups02.jpg",
  "images/Cups03.jpg",
  "images/Cups04.jpg",
  "images/Cups05.jpg",
  "images/Cups06.jpg",
  "images/Cups07.jpg",
  "images/Cups08.jpg",
  "images/Cups09.jpg",
  "images/Cups10.jpg",
  "images/Cups11.jpg",
  "images/Cups12.jpg",
  "images/Cups13.jpg",
  "images/Cups14.jpg",
  "images/Pentacles01.jpg",
  "images/Pentacles02.jpg",
  "images/Pentacles03.jpg",
  "images/Pentacles04.jpg",
  "images/Pentacles05.jpg",
  "images/Pentacles06.jpg",
  "images/Pentacles07.jpg",
  "images/Pentacles08.jpg",
  "images/Pentacles09.jpg",
  "images/Pentacles10.jpg",
  "images/Pentacles11.jpg",
  "images/Pentacles12.jpg",
  "images/Pentacles13.jpg",
  "images/Pentacles14.jpg",
  "images/Swords01.jpg",
  "images/Swords02.jpg",
  "images/Swords03.jpg",
  "images/Swords04.jpg",
  "images/Swords05.jpg",
  "images/Swords06.jpg",
  "images/Swords07.jpg",
  "images/Swords08.jpg",
  "images/Swords09.jpg",
  "images/Swords10.jpg",
  "images/Swords11.jpg",
  "images/Swords12.jpg",
  "images/Swords13.jpg",
  "images/Swords14.jpg",
  "images/Wands01.jpg",
  "images/Wands02.jpg",
  "images/Wands03.jpg",
  "images/Wands04.jpg",
  "images/Wands05.jpg",
  "images/Wands06.jpg",
  "images/Wands07.jpg",
  "images/Wands08.jpg",
  "images/Wands09.jpg",
  "images/Wands10.jpg",
  "images/Wands11.jpg",
  "images/Wands12.jpg",
  "images/Wands13.jpg",
  "images/Wands14.jpg"
];

// установка стартовых классов для тасовки
function setShuffleClasses() {
  container.classList.remove("row-mode");
  const classes = ['left', 'active', 'right'];
  cards.forEach((card, index) => {
    card.classList.remove('left', 'active', 'right', 'row');
    card.classList.add(classes[index]);
  });
}

// три карты в ряд
function setRowClasses() {
  cards.forEach(card => {
    card.classList.remove('left', 'active', 'right');
    card.classList.add('row');
  });
  container.classList.add("row-mode");
}

// смена позиций при тасовке
function changePositions() {
  const leftCard = document.querySelector('.cards.left');
  const activeCard = document.querySelector('.cards.active');
  const rightCard = document.querySelector('.cards.right');

  leftCard.classList.replace('left', 'active');
  activeCard.classList.replace('active', 'right');
  rightCard.classList.replace('right', 'left');
}

// анимация тасовки
function autoShuffle(times = 5) {
  setShuffleClasses();

  // показываем рубашки во время тасовки
  const randomBacks = getRandomCards(3, cardBacks);
  cards.forEach((card, i) => {
    card.style.backgroundImage = `url('${randomBacks[i]}')`;
  });

  let count = 0;
  const interval = setInterval(() => {
    changePositions();
    count++;
    if (count >= times) {
      clearInterval(interval);
      fadeOutAndReset();
    }
  }, 800);
}

// скрыть, обновить и показать новые карты
function fadeOutAndReset() {
  container.style.transition = "opacity 0.5s";
  container.style.opacity = "0";

  setTimeout(() => {
    const randomCards = getRandomCards(3, cardFaces);
    cards.forEach((card, i) => {
      card.style.backgroundImage = `url('${randomCards[i]}')`;
    });

    setRowClasses();
    container.style.opacity = "1";
  }, 1200);
}

// выбрать случайные карты из указанного массива
function getRandomCards(num, sourceArray) {
  const shuffled = [...sourceArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

// начальные карты сразу в режиме тасовки
function initCards() {
  const randomCards = getRandomCards(3, cardBacks);
  cards.forEach((card, i) => {
    card.style.backgroundImage = `url('${randomCards[i]}')`;
  });
  setShuffleClasses();
}

// старт
function startGame() {
  autoShuffle();
}

document.addEventListener("DOMContentLoaded", () => {
  initCards();
  document.getElementById("startBtn").addEventListener("click", startGame);
});
