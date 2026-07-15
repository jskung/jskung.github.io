// ============================================
// Jeffrey Kung — Portfolio
// ============================================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- mobile nav ---------- */

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---------- typewriter effect ---------- */

const typedEl = document.getElementById('typed-text');
const phrases = [
  'building an automated trading bot...',
  'developing PharoahAI, an AI executive assistant...',
  'shipping GroupMeUp, a social meetup app...',
  'automating ETL pipelines with Python...',
  'debugging at 2am...',
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];

  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 30 : 55);
}

typeLoop();

/* ---------- interactive terminal ---------- */

const terminalBody = document.getElementById('terminal-body');
const terminalForm = document.getElementById('terminal-form');
const terminalInput = document.getElementById('terminal-input');

function appendLine(text, className) {
  const div = document.createElement('div');
  div.className = className || 'output';
  div.textContent = text;
  terminalBody.appendChild(div);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

function appendCommandEcho(cmd) {
  const div = document.createElement('div');
  div.className = 'line';
  div.innerHTML = `<span class="prompt">jeffrey@portfolio</span><span class="path">~</span><span class="dollar">$</span> ${escapeHtml(cmd)}`;
  terminalBody.appendChild(div);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

const commands = {
  help: () =>
    [
      'available commands:',
      '  about       - jump to the about section',
      '  experience  - jump to the experience section',
      '  projects    - jump to the projects section',
      '  skills      - jump to the skills section',
      '  education   - jump to the education section',
      '  contact     - jump to the contact section',
      '  whoami      - who is this, anyway',
      '  date        - current date/time',
      '  clear       - clear the terminal',
      '  echo <x>    - print x back',
    ].join('\n'),
  about: () => scrollTo('about'),
  experience: () => scrollTo('experience'),
  projects: () => scrollTo('projects'),
  skills: () => scrollTo('skills'),
  education: () => scrollTo('education'),
  contact: () => scrollTo('contact'),
  whoami: () => 'jeffrey — full-stack developer, currently freelancing at JVAR Capital and building PharoahAI',
  date: () => new Date().toString(),
  clear: () => {
    terminalBody.innerHTML = '';
    return null;
  },
  github: () => scrollTo('contact'),
  linkedin: () => scrollTo('contact'),
  sudo: () => "nice try. permission denied — you're not root here 😏",
};

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  return `navigating to #${id}...`;
}

terminalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const raw = terminalInput.value.trim();
  if (!raw) return;

  appendCommandEcho(raw);

  const [cmd, ...rest] = raw.split(/\s+/);
  const arg = rest.join(' ');
  const key = cmd.toLowerCase();

  let result;

  if (key === 'echo') {
    result = arg || '';
  } else if (key === 'sudo') {
    result = commands.sudo();
  } else if (commands[key]) {
    result = commands[key]();
  } else {
    result = `command not found: ${cmd} (type 'help' for a list)`;
  }

  if (result) appendLine(result);

  terminalInput.value = '';
});

/* ---------- placeholder project links ---------- */

document.querySelectorAll('[data-placeholder]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    appendLine(
      `heads up: this "${link.dataset.placeholder}" link is a placeholder — edit index.html to point it at the real URL.`
    );
    scrollTo('home');
  });
});

/* ---------- scroll reveal ---------- */

const revealTargets = document.querySelectorAll(
  '.about-grid, .projects-grid > *, .skills-grid > *, .contact-container'
);

revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => observer.observe(el));

/* ---------- active nav link on scroll ---------- */

const sections = document.querySelectorAll('main .section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinkEls.forEach((link) => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}` ? 'var(--accent)' : '';
        });
      }
    });
  },
  { rootMargin: '-50% 0px -50% 0px' }
);

sections.forEach((section) => navObserver.observe(section));

/* ---------- subtle matrix rain background ---------- */

const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
let columns, drops;

function setupCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const fontSize = 16;
  columns = Math.floor(canvas.width / fontSize);
  drops = new Array(columns).fill(0);
}

setupCanvas();
window.addEventListener('resize', setupCanvas);

const chars = '01アイウエオカキクケコ';

function drawMatrix() {
  ctx.fillStyle = 'rgba(10, 14, 20, 0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#39ff88';
  ctx.font = '16px monospace';

  drops.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * 16;
    ctx.fillText(char, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    } else {
      drops[i] = y + 16;
    }
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  setInterval(drawMatrix, 60);
}
