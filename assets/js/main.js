/* ============================================================
   MORYA ENTERPRISES — main.js
   Features: AOS init, Navbar scroll, Hamburger menu,
             Counter animation, Language switcher,
             Back to top, Smooth scroll, Form feedback
============================================================ */

/* ---------- AOS (Animate on Scroll) ---------- */
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 700,
    once: true,
    easing: 'ease-out-cubic',
    offset: 60,
  });
});

/* ---------- Navbar: shrink on scroll ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  // Back to top visibility
  const btn = document.getElementById('backToTop');
  btn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* ---------- Hamburger Menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close on nav link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ---------- Counter Animation ---------- */
const counters = document.querySelectorAll('.stat-num[data-count]');
let counted = false;

function runCounters() {
  if (counted) return;
  const heroStats = document.querySelector('.hero-stats');
  if (!heroStats) return;
  const rect = heroStats.getBoundingClientRect();
  if (rect.top < window.innerHeight - 50) {
    counted = true;
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'), 10);
      let current = 0;
      const step = target / 40;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 40);
    });
  }
}

window.addEventListener('scroll', runCounters, { passive: true });
// Run once immediately in case already in view
setTimeout(runCounters, 500);

/* ---------- Back to Top ---------- */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- Language Switcher ---------- */
let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;

  // Update active button
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-mr').classList.toggle('active', lang === 'mr');

  // Update all elements with data-en / data-mr attributes
  const elements = document.querySelectorAll('[data-en]');
  elements.forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (!val) return;

    // For inputs / selects / textareas — update placeholder
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      const placeholder = el.getAttribute('data-' + lang + '-placeholder') || val;
      el.placeholder = placeholder;
      return;
    }

    // For select options inside a select
    if (el.tagName === 'OPTION') {
      el.textContent = val;
      return;
    }

    // For elements with HTML content (br tags, etc.)
    if (val.includes('<br') || val.includes('<span')) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });

  // Update html lang attribute
  document.documentElement.lang = lang === 'mr' ? 'mr' : 'en';

  // Store preference
  try { localStorage.setItem('morya_lang', lang); } catch(e) {}
}

// Restore saved language on load
document.addEventListener('DOMContentLoaded', () => {
  try {
    const saved = localStorage.getItem('morya_lang');
    if (saved && saved !== 'en') setLang(saved);
  } catch(e) {}
});

/* ---------- Active nav link highlighting ---------- */
const sections = document.querySelectorAll('section[id]');
const navAnchs  = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightNav() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navAnchs.forEach(a => {
    a.classList.remove('active-nav');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active-nav');
  });
}
window.addEventListener('scroll', highlightNav, { passive: true });

/* ---------- Contact Form feedback ---------- */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = currentLang === 'mr' ? 'पाठवत आहे...' : 'Sending...';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        btn.textContent = currentLang === 'mr' ? '✓ पाठवले!' : '✓ Sent!';
        btn.style.background = '#27AE60';
        form.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error('server');
      }
    } catch (err) {
      btn.textContent = currentLang === 'mr' ? 'त्रुटी — पुन्हा प्रयत्न करा' : 'Error — please try again';
      btn.style.background = '#C0392B';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 4000);
    }
  });
}

/* ---------- Smooth scroll for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // navbar height
    const top = target.offsetTop - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---------- Add active-nav style ---------- */
const style = document.createElement('style');
style.textContent = `.nav-links a.active-nav { color: var(--gold) !important; }`;
document.head.appendChild(style);
