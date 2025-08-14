/**
 * Parallax background: map page scroll 0%→100% to image translate top→bottom.
 * (Foreground content sits above the image; hero logo position uses CSS only.)
 */
(function(){
  const bg = document.getElementById('parallax-bg');
  if (!bg) return;

  let naturalRatio = 1;   // height / width
  let vw = 0, vh = 0, docH = 0, maxShift = 0;

  function calc() {
    vw = window.innerWidth;
    vh = window.innerHeight;

    const w = bg.naturalWidth || bg.width;
    const h = bg.naturalHeight || bg.height;
    if (w && h) naturalRatio = h / w;

    const renderedHeight = vw * naturalRatio;
    const finalHeight = Math.max(renderedHeight, vh);

    docH = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    maxShift = Math.max(finalHeight - vh, 0);

    bg.style.height = finalHeight + 'px';
  }

  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const scrollable = Math.max(docH - vh, 1);
    const progress = Math.min(Math.max(scrollY / scrollable, 0), 1);
    const y = -progress * maxShift;
    bg.style.transform = 'translate3d(0,' + y + 'px,0)';
  }

  function init() { calc(); onScroll(); }

  if (!bg.complete) bg.addEventListener('load', init, { once: true });
  else init();

  window.addEventListener('resize', () => { calc(); onScroll(); });
  window.addEventListener('orientationchange', () => { calc(); onScroll(); });
  window.addEventListener('scroll', onScroll, { passive: true });
})();