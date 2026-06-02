document.addEventListener('DOMContentLoaded', () => {
  const servicesTrack = document.getElementById('servicesTrack');
  const srvPrev = document.getElementById('srvPrev');
  const srvNext = document.getElementById('srvNext');
  if (servicesTrack) {
    const cards = Array.from(servicesTrack.querySelectorAll('.service-card'));
    let index = 0;
    let slideWidth = cards[0]?.getBoundingClientRect().width || 320;
    function update() { servicesTrack.style.transform = `translateX(-${index * (slideWidth + 16)}px)`; updateDots(); }
    function next() { index = Math.min(cards.length - visibleCount(), index + 1); if (index > cards.length - visibleCount()) index = 0; update(); }
    function prev() { index = Math.max(0, index - 1); if (index < 0) index = cards.length - visibleCount(); update(); }
    function visibleCount() { const w = window.innerWidth; if (w <= 768) return 1; if (w <= 1024) return 2; return 3 }
    srvNext?.addEventListener('click', () => { next(); resetAutoplay(); });
    srvPrev?.addEventListener('click', () => { prev(); resetAutoplay(); });
    let startX = 0;
    servicesTrack.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    servicesTrack.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - startX; if (dx < -50) next(); if (dx > 50) prev(); resetAutoplay(); });
    let autoplay = setInterval(next, 4000);
    function resetAutoplay() { clearInterval(autoplay); autoplay = setInterval(next, 4000); }
    window.addEventListener('resize', () => { slideWidth = cards[0]?.getBoundingClientRect().width || slideWidth; update(); });
  }

  const testimonialsTrack = document.getElementById('testimonialsTrack');
  const testimonialDots = document.getElementById('testimonialDots');
  if (testimonialsTrack) {
    const items = Array.from(testimonialsTrack.children);
    let tIndex = 0;
    function show(i) { items.forEach((it, idx) => it.style.display = idx === i ? 'block' : 'none'); if (testimonialDots) Array.from(testimonialDots.children).forEach((d,idx)=> d.classList.toggle('active', idx===i)); }
    function tNext() { tIndex = (tIndex + 1) % items.length; show(tIndex); }
    items.forEach(()=> { if (testimonialDots) { const b = document.createElement('button'); testimonialDots.appendChild(b); } });
    if (testimonialDots) Array.from(testimonialDots.children).forEach((b,i)=> b.addEventListener('click', ()=> { tIndex = i; show(i); }));
    show(0); setInterval(tNext, 5000);
  }
});
