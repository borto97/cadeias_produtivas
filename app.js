(function () {
  const sections = Array.from(document.querySelectorAll('.section'));
  let current = 0;

  const indicator = document.getElementById('slideIndicator');
  const btnPrev   = document.getElementById('btnPrev');
  const btnNext   = document.getElementById('btnNext');

  function clamp(i){ return Math.max(0, Math.min(i, sections.length - 1)); }

  function updateIndicator(){
    if (indicator) indicator.textContent = `${current + 1}/${sections.length}`;
  }

  function show(i){
    current = clamp(i);

    sections.forEach(s => {
      s.classList.remove('active');
      s.style.display = 'none';
    });

    const el = sections[current];
    el.style.display = 'block';
    el.classList.add('active');
    el.focus({ preventScroll: true });
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    updateIndicator();
  }

  // iniciar no primeiro slide
  show(0);

  // ---------------------------
  // Teclado: números e setas
  // ---------------------------
  window.addEventListener('keydown', (e) => {
    const n = parseInt(e.key, 10);
    if (!isNaN(n) && n >= 1 && n <= sections.length) {
      show(n - 1);
      return;
    }
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'ArrowLeft')  show(current - 1);
    if (e.key === 'Home')       show(0);
    if (e.key === 'End')        show(sections.length - 1);
  });

  // ---------------------------
  // Mouse: esquerdo = próximo, direito = anterior
  // ---------------------------
  window.addEventListener('mousedown', (e) => {
    // evita que clique nos botões cause "duplo avanço" (window + button)
    const targetIsCtrl = e.target === btnPrev || e.target === btnNext;
    if (targetIsCtrl) return;

    if (e.button === 0) show(current + 1); // esquerdo
    if (e.button === 2) show(current - 1); // direito
  });

  // remover menu de contexto para usar direito como "voltar"
  window.addEventListener('contextmenu', (e) => e.preventDefault());

  // ---------------------------
  // Botões HUD
  // ---------------------------
  if (btnPrev){
    btnPrev.addEventListener('mousedown', (e) => e.stopPropagation());
    btnPrev.addEventListener('click', () => show(current - 1));
  }
  if (btnNext){
    btnNext.addEventListener('mousedown', (e) => e.stopPropagation());
    btnNext.addEventListener('click', () => show(current + 1));
  }
})();
