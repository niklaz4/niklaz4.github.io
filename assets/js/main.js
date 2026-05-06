// Nav toggle
const toggle = document.getElementById('nav-toggle');
const nav = document.getElementById('site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Intersection Observer for scroll animations
const animatedEls = document.querySelectorAll('.post-card, .featured-post, .sidebar-widget');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animatedEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});

// Active nav highlighting
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('active');
  }
});

// Copy code button
document.querySelectorAll('pre').forEach(block => {
  const btn = document.createElement('button');
  btn.textContent = 'copy';
  btn.style.cssText = `
    position: absolute;
    top: 0.6rem;
    left: 1rem;
    font-family: var(--mono, monospace);
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    color: #484f58;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;
  `;

  btn.addEventListener('click', () => {
    const code = block.querySelector('code');
    if (code) {
      navigator.clipboard.writeText(code.textContent).then(() => {
        btn.textContent = 'copied!';
        btn.style.color = '#00ff88';
        setTimeout(() => {
          btn.textContent = 'copy';
          btn.style.color = '#484f58';
        }, 2000);
      });
    }
  });

  block.style.position = 'relative';
  block.appendChild(btn);
});
