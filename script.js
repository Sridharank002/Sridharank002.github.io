// -------------- THEME (dark/light) --------------
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const metaTheme = document.getElementById('theme-color');

function applyTheme(theme) {
    root.className = theme;
    localStorage.setItem('theme', theme);
    metaTheme.setAttribute('content', theme === 'light' ? '#f8fafc' : '#0b0f17');
}
// Prefer user stored theme or system preference on first load
const stored = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
applyTheme(stored || (prefersLight ? 'light' : 'dark'));

themeToggle ? .addEventListener('click', () => {
    const current = root.className;
    applyTheme(current === 'light' ? 'dark' : 'light');
});

// -------------- MOBILE NAV --------------
const menuBtn = document.getElementById('menuBtn');
const menuList = document.getElementById('menuList');
menuBtn ? .addEventListener('click', () => {
    const open = menuList.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
});
// Close on link click (mobile)
menuList ? .querySelectorAll('a').forEach(a => a.addEventListener('click', () => menuList.classList.remove('open')));

// -------------- PROJECT FILTERS --------------
const projectGrid = document.getElementById('projectGrid');
document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
        const tag = btn.getAttribute('data-filter');
        projectGrid.querySelectorAll('.project').forEach(card => {
            const tags = card.getAttribute('data-tags');
            const visible = (tag === 'all') || tags.includes(tag);
            card.style.display = visible ? '' : 'none';
        });
    });
});

// -------------- CONTACT FORM (no backend) --------------
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form ? .addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const entries = Object.fromEntries(data.entries());

    // Option A: open mail client (simple, no backend)
    const subject = encodeURIComponent('Portfolio inquiry from ' + entries.name);
    const body = encodeURIComponent(entries.message + '\n\nFrom: ' + entries.name + ' <' + entries.email + '>');
    window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;

    // User feedback
    formMsg.textContent = 'Thanks! Your email client should open now.';
    form.reset();
});

// -------------- YEAR + ENTRY ANIMATIONS --------------
document.getElementById('year').textContent = new Date().getFullYear();

// Simple fade‑in on scroll using IntersectionObserver
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.animate([{
                opacity: 0,
                transform: 'translateY(8px)'
            }, {
                opacity: 1,
                transform: 'translateY(0)'
            }], {
                duration: 400,
                easing: 'ease-out',
                fill: 'forwards'
            });
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll('section .card, .project, .skills .card').forEach(el => observer.observe(el));