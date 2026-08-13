// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

hamburger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.style.overflow = open ? 'hidden' : '';
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => observer.observe(s));

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.service-card, .process-step, .clientele-card, .testimonial, .fleet-list li');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.service-card, .process-step, .clientele-card, .testimonial, .fleet-list li').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
  });
});

// Make visible class work
const style = document.createElement('style');
style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// Form submit
function handleSubmit(e) {
  e.preventDefault();
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 5000);
  e.target.reset();
}

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.borderBottomColor = window.scrollY > 10
    ? 'rgba(201,169,110,0.15)'
    : 'rgba(255,255,255,0.07)';
});

// ── Mobile submenu accordions ──
document.querySelectorAll('.m-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.m-item');
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});

// ── Desktop dropdown aria state ──
document.querySelectorAll('.nav-item--menu').forEach(item => {
  const trigger = item.querySelector('a[aria-haspopup]');
  if (!trigger) return;
  const set = v => trigger.setAttribute('aria-expanded', v ? 'true' : 'false');
  item.addEventListener('mouseenter', () => set(true));
  item.addEventListener('mouseleave', () => set(false));
  item.addEventListener('focusin',   () => set(true));
  item.addEventListener('focusout',  e => {
    if (!item.contains(e.relatedTarget)) set(false);
  });
});

// Close any open dropdown on Escape
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const open = document.activeElement?.closest?.('.nav-item--menu');
  if (open) open.querySelector('a[aria-haspopup]')?.focus();
});
