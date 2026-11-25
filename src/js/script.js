// Дані
const PERSON_FULL_NAME = 'NOEL TAYLOR';

const experienceData = [
  {
    title: 'SENIOR WEB DESIGNER',
    period: '2020 -Present',
    company: 'Creative Agency / Chicago',
    text: "Lorem Ipsum has been the industry's standard dummy text ever since 1500s, when unknown printer took a galley of type."
  },
  {
    title: 'GRAPHIC DESIGNER',
    period: '2015 -2020',
    company: 'Creative Market / Chicago',
    text: "Lorem Ipsum has been the industry's standard dummy text ever since 1500s, when unknown printer took a galley of type."
  },
  {
    title: 'MARKETING MANAGER',
    period: '2013 -2015',
    company: 'Manufacturing Agency / NJ',
    text: "Lorem Ipsum has been the industry's standard dummy text ever since 1500s, when unknown printer took a galley of type."
  }
];

const skillsData = [
  { name: 'Adobe Photoshop',      level: 80 },
  { name: 'Adobe Illustrator',    level: 75 },
  { name: 'Microsoft Word',       level: 90 },
  { name: 'Microsoft Powerpoint', level: 85 },
  { name: 'HTML-5/CSS-3',         level: 70 }
];

// Завдання 1: запис імені як текст (без HTML)
function setPersonName(elementId, fullName) {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.textContent = fullName;
}

// Завдання 3: генерація розмітки з масивів
function renderExperience(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = ''; // очищення перед вставкою

  const markup = items
    .map(({ title, period, company, text }) => `
      <article class="job-item">
        <div class="d-flex justify-content-between align-items-center">
          <h3>${title}</h3>
          <span class="job-item__period">${period}</span>
        </div>
        <p class="job-item__company">${company}</p>
        <p class="job-item__text">${text}</p>
      </article>`)
    .join('');

  container.insertAdjacentHTML('beforeend', markup);
}

function renderSkills(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = ''; // очищення перед вставкою

  const markup = items
    .map(({ name, level }) => `
      <div class="skill-item col-6 d-flex align-items-center">
        <span class="skill-name">${name}</span>
        <div class="skill-track"><div class="skill-bar-fill skill-${level}"></div></div>
      </div>`)
    .join('');

  container.insertAdjacentHTML('beforeend', markup);
}

// Завдання 2: згортання/розгортання блоків (обробник на самій стрілці)
function toggleSection(arrow) {
  const body = document.getElementById(arrow.dataset.target);
  if (!body) return;

  const isHidden = body.classList.toggle('is-hidden'); // службовий клас видимості
  arrow.classList.toggle('is-flipped', isHidden);      // клас з обертанням стрілки
  arrow.setAttribute('aria-expanded', String(!isHidden));
}

function initToggles() {
  document.querySelectorAll('.toggle-arrow').forEach((arrow) => {
    arrow.addEventListener('click', () => toggleSection(arrow));
  });
}

// Запуск після завантаження документа
document.addEventListener('DOMContentLoaded', () => {
  setPersonName('personName', PERSON_FULL_NAME);
  renderExperience('experience-list', experienceData);
  renderSkills('skills-list', skillsData);
  initToggles();
});