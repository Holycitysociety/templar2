/**
 * Parallax background that maps page scroll 0%→100%
 * to the background image translate from its top to its bottom.
 *
 * The image is fixed (fills width). We translate it vertically so that:
 *   progress = scrollY / (docHeight - viewportHeight)
 *   translateY = - progress * (imgRenderedHeight - viewportHeight)
 *
 * That means: at the very bottom of the page you see the very bottom of the image.
 */
(function(){
  const bg = document.getElementById('parallax-bg');
  if (!bg) return;

  let naturalRatio = 1;   // height / width of the image
  let vw = 0, vh = 0, docH = 0, maxShift = 0;

  function calc() {
    vw = window.innerWidth;
    vh = window.innerHeight;

    // infer natural aspect ratio if possible
    const w = bg.naturalWidth || bg.width;
    const h = bg.naturalHeight || bg.height;
    if (w && h) naturalRatio = h / w;

    // rendered height when width = 100vw
    const renderedHeight = vw * naturalRatio;

    // ensure the image is at least viewport tall (rare edge case on ultra-wide)
    const finalHeight = Math.max(renderedHeight, vh);

    // total page height minus viewport height
    docH = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const scrollable = Math.max(docH - vh, 1);

    // how far we can shift the image before its bottom reaches viewport bottom
    maxShift = Math.max(finalHeight - vh, 0);

    // write explicit CSS height so mobile layout engines don't reflow mid-scroll
    bg.style.height = finalHeight + 'px';
  }

  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const scrollable = Math.max(docH - vh, 1);
    const progress = Math.min(Math.max(scrollY / scrollable, 0), 1);
    const y = -progress * maxShift;
    bg.style.transform = 'translate3d(0,' + y + 'px,0)';
  }

  // Recalc after image loads, and on resize/orientation
  function init() {
    calc();
    onScroll();
  }

  if (!bg.complete) {
    bg.addEventListener('load', init, { once: true });
  } else {
    init();
  }

  window.addEventListener('resize', () => { calc(); onScroll(); });
  window.addEventListener('orientationchange', () => { calc(); onScroll(); });
  window.addEventListener('scroll', onScroll, { passive: true });
})();