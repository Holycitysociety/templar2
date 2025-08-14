// Simple, efficient scroll progress writer
// --progress goes from 0 at top → 1 at bottom of the track
(function(){
  const track = document.getElementById('track');
  if (!track) return;

  const update = () => {
    const rect = track.getBoundingClientRect();
    const total = track.offsetHeight - window.innerHeight;
    const scrolled = Math.min(Math.max(window.scrollY, 0), total);
    const progress = total > 0 ? scrolled / total : 0;
    document.documentElement.style.setProperty('--progress', progress.toString());
  };

  // Initial + scroll/resize
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();