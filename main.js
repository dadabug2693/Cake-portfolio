document.documentElement.classList.add('js');
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  links.classList.toggle('is-open', !open);
});
links.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    toggle.setAttribute('aria-expanded', 'false');
    links.classList.remove('is-open');
  }
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});

// Gallery filters
const filters = document.querySelectorAll('.filter');
const items = document.querySelectorAll('.gallery li');
filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    filters.forEach((b) => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    items.forEach((li) => li.classList.toggle('is-hidden', f !== 'all' && li.dataset.cat !== f));
  });
});

// Lightbox
const box = document.querySelector('.lightbox');
const boxImg = box.querySelector('img');
const boxCap = box.querySelector('figcaption');
let current = 0;

const visibleTiles = () =>
  [...document.querySelectorAll('.gallery li:not(.is-hidden) .tile')];

function show(i) {
  const tiles = visibleTiles();
  current = (i + tiles.length) % tiles.length;
  const tile = tiles[current];
  boxImg.src = tile.dataset.full;
  boxImg.alt = tile.querySelector('img').alt;
  boxCap.textContent = tile.dataset.caption;
}

document.querySelector('.gallery').addEventListener('click', (e) => {
  const tile = e.target.closest('.tile');
  if (!tile) return;
  show(visibleTiles().indexOf(tile));
  box.showModal();
});
box.querySelector('.prev').addEventListener('click', () => show(current - 1));
box.querySelector('.next').addEventListener('click', () => show(current + 1));
box.querySelector('.lightbox-close').addEventListener('click', () => box.close());
box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
box.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') show(current - 1);
  if (e.key === 'ArrowRight') show(current + 1);
});
