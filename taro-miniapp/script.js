const cards = document.querySelectorAll('.cards');
const container = document.querySelector('.container');

const cardImages = [
  "https://cdn.pixabay.com/photo/2015/08/11/11/57/spades-884197_960_720.png",
  "https://cdn.pixabay.com/photo/2015/08/11/11/57/spades-884203_960_720.png",
  "https://cdn.pixabay.com/photo/2015/08/11/11/57/spades-884192_960_720.png",
  "https://cdn.pixabay.com/photo/2015/08/11/11/57/spades-884196_960_720.png",
  "https://cdn.pixabay.com/photo/2015/08/11/11/57/spades-884198_960_720.png",
  "https://cdn.pixabay.com/photo/2015/08/11/11/57/spades-884201_960_720.png"
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
  container.style.transition = "opacity 1s";
  container.style.opacity = "0";

  setTimeout(() => {
    const randomCards = getRandomCards(3);
    cards.forEach((card, i) => {
      card.style.backgroundImage = `url('${randomCards[i]}')`;
    });

    setRowClasses(); // после тасовки в ряд
    container.style.opacity = "1";
  }, 1200);
}

// выбрать случайные карты
function getRandomCards(num) {
  const shuffled = [...cardImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

// начальные карты сразу в режиме тасовки
function initCards() {
  const randomCards = getRandomCards(3);
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
