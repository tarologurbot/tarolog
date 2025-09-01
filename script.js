const cards = document.querySelectorAll('.cards');
const container = document.querySelector('.container');

let isShuffling = false; // флаг для защиты от повторного запуска

// массив карт с описанием
const tarotCards = [
  // Старшие Арканы
  { name: "The Fool", image: "images/00-TheFool.jpg", description: "Начало нового пути, приключения, спонтанность, открытость к новому." },
  { name: "The Magician", image: "images/01-TheMagician.jpg", description: "Сила воли, мастерство, возможности и ресурсы для реализации планов." },
  { name: "The High Priestess", image: "images/02-TheHighPriestess.jpg", description: "Интуиция, тайные знания, мудрость, внутреннее видение." },
  { name: "The Empress", image: "images/03-TheEmpress.jpg", description: "Творчество, материнство, процветание, забота и любовь." },
  { name: "The Emperor", image: "images/04-TheEmperor.jpg", description: "Структура, стабильность, власть, контроль и ответственность." },
  { name: "The Hierophant", image: "images/05-TheHierophant.jpg", description: "Традиции, духовные ценности, обучение, наставничество." },
  { name: "The Lovers", image: "images/06-TheLovers.jpg", description: "Любовь, партнерство, гармония, выбор и решения." },
  { name: "The Chariot", image: "images/07-TheChariot.jpg", description: "Упорство, контроль над ситуацией, победа через дисциплину." },
  { name: "Strength", image: "images/08-Strength.jpg", description: "Сила характера, терпение, внутреннее мужество." },
  { name: "The Hermit", image: "images/09-TheHermit.jpg", description: "Размышление, внутренний поиск, мудрость, одиночество." },
  { name: "Wheel of Fortune", image: "images/10-WheelOfFortune.jpg", description: "Перемены, циклы, судьба, неожиданные события." },
  { name: "Justice", image: "images/11-Justice.jpg", description: "Справедливость, честность, причинно-следственные связи." },
  { name: "The Hanged Man", image: "images/12-TheHangedMan.jpg", description: "Пауза, смирение, новый взгляд, жертва ради понимания." },
  { name: "Death", image: "images/13-Death.jpg", description: "Конец одного этапа, трансформация, обновление." },
  { name: "Temperance", image: "images/14-Temperance.jpg", description: "Гармония, баланс, умеренность, самоконтроль." },
  { name: "The Devil", image: "images/15-TheDevil.jpg", description: "Привязанности, ограничения, иллюзии, искушения." },
  { name: "The Tower", image: "images/16-TheTower.jpg", description: "Разрушение, резкие перемены, освобождение от иллюзий." },
  { name: "The Star", image: "images/17-TheStar.jpg", description: "Надежда, вдохновение, духовное обновление, вера." },
  { name: "The Moon", image: "images/18-TheMoon.jpg", description: "Иллюзии, подсознание, тайны, внутренние страхи." },
  { name: "The Sun", image: "images/19-TheSun.jpg", description: "Радость, успех, ясность, жизненная энергия." },
  { name: "Judgement", image: "images/20-Judgement.jpg", description: "Осознание, возрождение, прощение, окончательное решение." },
  { name: "The World", image: "images/21-TheWorld.jpg", description: "Завершение цикла, успех, гармония, целостность." },

  // Кубки (Cups)
  { name: "Ace of Cups", image: "images/Cups01.jpg", description: "Эмоции, новые чувства, любовь и вдохновение." },
  { name: "Two of Cups", image: "images/Cups02.jpg", description: "Партнерство, гармония, союз двух людей." },
  { name: "Three of Cups", image: "images/Cups03.jpg", description: "Радость, празднование, дружба, поддержка." },
  { name: "Four of Cups", image: "images/Cups04.jpg", description: "Размышления, апатия, переоценка ценностей." },
  { name: "Five of Cups", image: "images/Cups05.jpg", description: "Потери, сожаление, фокус на негативном." },
  { name: "Six of Cups", image: "images/Cups06.jpg", description: "Ностальгия, воспоминания, детская радость." },
  { name: "Seven of Cups", image: "images/Cups07.jpg", description: "Иллюзии, мечты, множество вариантов." },
  { name: "Eight of Cups", image: "images/Cups08.jpg", description: "Уход, поиск чего-то нового, духовный путь." },
  { name: "Nine of Cups", image: "images/Cups09.jpg", description: "Удовлетворение, исполнение желаний, счастье." },
  { name: "Ten of Cups", image: "images/Cups10.jpg", description: "Семейное счастье, гармония, эмоциональная полнота." },
  { name: "Page of Cups", image: "images/Cups11.jpg", description: "Любопытство, новые впечатления, эмоциональное развитие." },
  { name: "Knight of Cups", image: "images/Cups12.jpg", description: "Романтика, предложения, движение чувств." },
  { name: "Queen of Cups", image: "images/Cups13.jpg", description: "Сострадание, забота, эмоциональная стабильность." },
  { name: "King of Cups", image: "images/Cups14.jpg", description: "Мудрость, контроль эмоций, дипломатия." },

  // Пентакли (Pentacles)
  { name: "Ace of Pentacles", image: "images/Pentacles01.jpg", description: "Новые возможности, материальный успех, финансы." },
  { name: "Two of Pentacles", image: "images/Pentacles02.jpg", description: "Баланс, управление ресурсами, гибкость." },
  { name: "Three of Pentacles", image: "images/Pentacles03.jpg", description: "Командная работа, мастерство, планирование." },
  { name: "Four of Pentacles", image: "images/Pentacles04.jpg", description: "Стабильность, накопления, контроль ресурсов." },
  { name: "Five of Pentacles", image: "images/Pentacles05.jpg", description: "Трудности, финансовые потери, нехватка поддержки." },
  { name: "Six of Pentacles", image: "images/Pentacles06.jpg", description: "Щедрость, помощь, обмен ресурсами." },
  { name: "Seven of Pentacles", image: "images/Pentacles07.jpg", description: "Терпение, оценка прогресса, планирование." },
  { name: "Eight of Pentacles", image: "images/Pentacles08.jpg", description: "Упорный труд, развитие навыков, мастерство." },
  { name: "Nine of Pentacles", image: "images/Pentacles09.jpg", description: "Самодостаточность, успех, материальная независимость." },
  { name: "Ten of Pentacles", image: "images/Pentacles10.jpg", description: "Семейное благополучие, богатство, наследие." },
  { name: "Page of Pentacles", image: "images/Pentacles11.jpg", description: "Новые начинания, обучение, внимательность к ресурсам." },
  { name: "Knight of Pentacles", image: "images/Pentacles12.jpg", description: "Стабильность, трудолюбие, последовательность." },
  { name: "Queen of Pentacles", image: "images/Pentacles13.jpg", description: "Забота, материальная стабильность, практичность." },
  { name: "King of Pentacles", image: "images/Pentacles14.jpg", description: "Финансовая уверенность, успех, ответственность." },

  // Мечи (Swords)
  { name: "Ace of Swords", image: "images/Swords01.jpg", description: "Новые идеи, решительность, ясность мысли." },
  { name: "Two of Swords", image: "images/Swords02.jpg", description: "Выбор, баланс, сомнения, нерешительность." },
  { name: "Three of Swords", image: "images/Swords03.jpg", description: "Грусть, разочарование, боль." },
  { name: "Four of Swords", image: "images/Swords04.jpg", description: "Отдых, восстановление, пауза." },
  { name: "Five of Swords", image: "images/Swords05.jpg", description: "Конфликт, победа любой ценой, споры." },
  { name: "Six of Swords", image: "images/Swords06.jpg", description: "Переход, путешествие, движение к лучшему." },
  { name: "Seven of Swords", image: "images/Swords07.jpg", description: "Хитрость, стратегия, скрытые действия." },
  { name: "Eight of Swords", image: "images/Swords08.jpg", description: "Ограничения, страхи, чувство безвыходности." },
  { name: "Nine of Swords", image: "images/Swords09.jpg", description: "Тревога, бессонница, переживания." },
  { name: "Ten of Swords", image: "images/Swords10.jpg", description: "Конец, поражение, предательство." },
  { name: "Page of Swords", image: "images/Swords11.jpg", description: "Любопытство, анализ, новые идеи." },
  { name: "Knight of Swords", image: "images/Swords12.jpg", description: "Быстрота действий, решительность, решительные шаги." },
  { name: "Queen of Swords", image: "images/Swords13.jpg", description: "Интеллект, проницательность, независимость." },
  { name: "King of Swords", image: "images/Swords14.jpg", description: "Мудрость, логика, власть, справедливость." },

  // Жезлы (Wands)
  { name: "Ace of Wands", image: "images/Wands01.jpg", description: "Энергия, новые начинания, креативность." },
  { name: "Two of Wands", image: "images/Wands02.jpg", description: "Планирование, перспектива, стратегия." },
  { name: "Three of Wands", image: "images/Wands03.jpg", description: "Расширение, прогресс, долгосрочные цели." },
  { name: "Four of Wands", image: "images/Wands04.jpg", description: "Празднование, стабильность, достижение целей." },
  { name: "Five of Wands", image: "images/Wands05.jpg", description: "Конкуренция, споры, борьба." },

  // добавь остальные карты по аналогии
];

// массив с рубашками
const cardBacks = [
  "images/CardBacks.jpg",
  "images/CardBacks.jpg",
  "images/CardBacks.jpg"
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
    card.dataset.index = ""; // очищаем
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
    const randomCards = getRandomCards(3, tarotCards);
    cards.forEach((card, i) => {
      card.style.backgroundImage = `url('${randomCards[i].image}')`;
      card.dataset.index = tarotCards.indexOf(randomCards[i]); // сохраняем индекс
    });

    setRowClasses();
    container.style.opacity = "1";

    // расклад закончен → можно снова запускать
    isShuffling = false;
    document.getElementById("startBtn").disabled = false;
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

// модальное окно
function showModal(cardData) {
  let modal = document.getElementById("modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <img id="modal-img" src="" alt="">
        <h2 id="modal-title"></h2>
        <p id="modal-text"></p>
      </div>
    `;
    document.body.appendChild(modal);

    // закрытие
    modal.querySelector(".close").onclick = () => modal.style.display = "none";
    window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
  }

  modal.querySelector("#modal-img").src = cardData.image;
  modal.querySelector("#modal-title").textContent = cardData.name;
  modal.querySelector("#modal-text").textContent = cardData.description;
  modal.style.display = "block";
}

// старт
function startGame() {
  if (isShuffling) return; // защита от повторного запуска
  isShuffling = true;
  document.getElementById("startBtn").disabled = true;
  autoShuffle();
}

// клики по картам
cards.forEach(card => {
  card.addEventListener("click", () => {
    const index = card.dataset.index;
    if (index !== "" && index !== undefined) {
      showModal(tarotCards[index]);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  initCards();
  document.getElementById("startBtn").addEventListener("click", startGame);
});
