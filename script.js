'use strict';

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Buka menu navigasi');
      menuToggle.textContent = '☰';
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
let previousFocus = null;

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  if (lightboxImage) lightboxImage.src = '';
  document.body.style.overflow = '';
  if (previousFocus) previousFocus.focus();
}

document.querySelectorAll('.screenshot-button').forEach((button) => {
  button.addEventListener('click', () => {
    const imagePath = button.dataset.image;
    const image = button.querySelector('img');
    if (!imagePath || button.classList.contains('image-missing') || (image && !image.complete)) return;
    previousFocus = button;
    lightboxImage.src = imagePath;
    lightboxImage.alt = image ? image.alt : 'Screenshot proyek';
    lightboxCaption.textContent = button.dataset.caption || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox && lightbox.classList.contains('open')) closeLightbox();
});
