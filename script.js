window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const background = document.querySelector('.parallax-bg');
  background.style.transform = `translateY(${scrolled * 0.5}px)`;
});