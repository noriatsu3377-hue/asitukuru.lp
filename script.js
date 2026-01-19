// Nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    navMenu.style.display = open ? 'none' : 'flex';
    if (!open) navMenu.style.flexDirection = 'column';
  });
  // Close menu on link tap (mobile)
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (getComputedStyle(navToggle).display !== 'none') {
      navMenu.style.display = 'none';
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }));
}

// Smooth scroll offset for sticky header
const header = document.querySelector('.site-header');
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (!id || id === '#' || id === '#0') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const rect = target.getBoundingClientRect();
    const top = window.scrollY + rect.top - (header?.offsetHeight || 0) - 6;
    window.scrollTo({ top, behavior: 'smooth' });
    history.pushState(null, '', id);
  });
});

// Sticky CTA visibility (hide near footer / show otherwise)
const sticky = document.getElementById('stickyCta');
const footer = document.querySelector('.site-footer');
if (sticky && footer) {
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) sticky.style.opacity = '0.3';
    else sticky.style.opacity = '1';
  }, { rootMargin: '0px 0px -20% 0px' });
  io.observe(footer);
}

// Copy bank info
document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', async () => {
    try {
      const targetSel = btn.getAttribute('data-copy');
      const el = document.querySelector(targetSel);
      const text = el?.value || el?.innerText || '';
      await navigator.clipboard.writeText(text);
      const old = btn.textContent;
      btn.textContent = 'コピーしました';
      setTimeout(() => (btn.textContent = old), 1600);
    } catch (e) {
      alert('コピーに失敗しました');
    }
  });
});
