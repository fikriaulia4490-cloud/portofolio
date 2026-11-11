
'use strict';

/* =========================================
   1. TAHUN OTOMATIS
========================================= */

const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}


/* =========================================
   2. MENU NAVIGASI MOBILE
========================================= */

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {

  function closeMenu() {
    navLinks.classList.remove('open');

    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute(
      'aria-label',
      'Buka menu navigasi'
    );

    menuToggle.textContent = '☰';
  }

  menuToggle.addEventListener('click', () => {

    const isOpen = navLinks.classList.toggle('open');

    menuToggle.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'
    );

    menuToggle.textContent = isOpen ? '✕' : '☰';

  });

  navLinks.querySelectorAll('a').forEach((link) => {

    link.addEventListener('click', closeMenu);

  });

}


/* =========================================
   3. ANIMASI SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll('.reveal');

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (
  'IntersectionObserver' in window &&
  !prefersReducedMotion
) {

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add('visible');

          currentObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.05,
      rootMargin: '0px 0px 50px 0px'
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });

} else {

  revealElements.forEach((element) => {
    element.classList.add('visible');
  });

}


/* =========================================
   4. LIGHTBOX SCREENSHOT
========================================= */

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

let previousFocus = null;


function closeLightbox() {

  if (!lightbox) return;

  lightbox.classList.remove('open');

  lightbox.setAttribute('aria-hidden', 'true');

  if (lightboxImage) {
    lightboxImage.src = '';
  }

  document.body.style.overflow = '';

  if (previousFocus) {
    previousFocus.focus();
    previousFocus = null;
  }

}


document.querySelectorAll('.screenshot-button').forEach((button) => {

  button.addEventListener('click', () => {

    if (
      !lightbox ||
      !lightboxImage ||
      !lightboxCaption ||
      !lightboxClose
    ) {
      return;
    }

    const imagePath = button.dataset.image;

    const image = button.querySelector('img');

    if (
      !imagePath ||
      button.classList.contains('image-missing') ||
      (image && (!image.complete || image.naturalWidth === 0))
    ) {
      return;
    }

    previousFocus = button;

    lightboxImage.src = imagePath;

    lightboxImage.alt = image
      ? image.alt
      : 'Screenshot proyek';

    lightboxCaption.textContent =
      button.dataset.caption || '';

    lightbox.classList.add('open');

    lightbox.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';

    lightboxClose.focus();

  });

});


/* =========================================
   5. TOMBOL TUTUP LIGHTBOX
========================================= */

if (lightboxClose) {

  lightboxClose.addEventListener(
    'click',
    closeLightbox
  );

}


if (lightbox) {

  lightbox.addEventListener('click', (event) => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });

}


/* =========================================
   6. TOMBOL ESCAPE
========================================= */

document.addEventListener('keydown', (event) => {

  if (
    event.key === 'Escape' &&
    lightbox &&
    lightbox.classList.contains('open')
  ) {

    closeLightbox();

  }

});


/* =========================================
   7. FALLBACK KONTEN
========================================= */

// Jika ada elemen reveal yang belum tampil,
// pastikan konten tidak tertinggal tersembunyi.

window.addEventListener('load', () => {

  revealElements.forEach((element) => {

    const rect = element.getBoundingClientRect();

    if (
      rect.top < window.innerHeight &&
      rect.bottom > 0
    ) {
      element.classList.add('visible');
    }

  });

});

