(function () {
  const sections = Array.from(document.querySelectorAll('.section'));

  // índice do slide atual
  let current = 0;

  function show(index) {
    if (index < 0 || index >= sections.length) return;
    current = index;

    sections.forEach(s => {
      s.classList.remove('active');
      s.style.display = 'none';
    });

    const el = sections[current];
    el.style.display = 'block';
    el.classList.add('active');
    el.focus();
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // iniciar no primeiro slide
  show(0);

  // NÚMEROS (1 = índice 0, 2 = índice 1, etc.)
  window.addEventListener('keydown', (e) => {
    const n = parseInt(e.key, 10);
    if (!isNaN(n) && n >= 1 && n <= sections.length) {
      show(n - 1);
    }
  });

  // SETAS ← → 
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'ArrowLeft') show(current - 1);
  });

})();
