document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.menu-toggle');
  const panel = document.getElementById('mt-menu');

  if (!btn || !panel) {
    console.warn('[MT menu] Toggle or panel not found. Check .menu-toggle and #mt-menu.');
    return;
  }

  const openMenu = () => {
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (panel.classList.contains('is-open')) closeMenu();
    else openMenu();
  };

  // Toggle
  btn.addEventListener('click', toggleMenu);

  // Click-away to close
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !btn.contains(e.target)) {
      closeMenu();
    }
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
});