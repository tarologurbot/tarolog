const cards = document.querySelectorAll('.cards');
const container = document.querySelector('.container');

// массив с рубашками
const cardBacks = [
  "images/CardBacks.jpg",
  "images/CardBacks.jpg",
  "images/CardBacks.jpg",
  "images/CardBacks.jpg",
  "images/CardBacks.jpg"
];

// массив с реальными картами
const cardFaces = [
  "images/Cups01.jpg",
  "images/Cups02.jpg",
  "images/Cups03.jpg",
  "images/Cups04.jpg",
  "images/Cups05.jpg"
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
  setShuffleClasses(); // включаем режим наложения
  let count = 0;

  // показываем рубашки во время тасовки
  const randomBacks = getRandomCards(3, cardBacks);
  cards.forEach((card, i) => {
    card.style.backgroundImage = `url('${randomBacks[i]}')`;
  });

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
    // выбираем случайные карты для результата
    const randomCards = getRandomCards(3, cardFaces);
    cards.forEach((card, i) => {
      card.style.backgroundImage = `url('${randomCards[i]}')`;
    });

    setRowClasses(); // после тасовки в ряд
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
  const randomCards = getRandomCards(3, cardBacks); // рубашки
  cards.forEach((card, i) => {
    card.style.backgroundImage = `url('${randomCards[i]}')`;
  });
  setShuffleClasses(); // при загрузке сразу наложение
}

// старт
function startGame() {
  autoShuffle();
}

document.addEventListener("DOMContentLoaded", () => {
  initCards();
  document.getElementById("startBtn").addEventListener("click", startGame);
});
