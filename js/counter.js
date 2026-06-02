document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll(
'.counter-value, .stat-num, .metric-number'
);
  const animateCounter = entry => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const targetValue = parseFloat(counter.dataset.target) || 0;
    const prefix = counter.dataset.prefix || '';
    const suffix = counter.dataset.suffix || '';
    let current = 0;
    const steps = 120;
    const increment = targetValue / steps;
    const step = () => {
      current += increment;
      if (current < targetValue) {
        const display = Number.isInteger(targetValue) ? Math.round(current) : current.toFixed(1);
        counter.textContent = `${prefix}${display}${suffix}`;
        requestAnimationFrame(step);
      } else {
        const final = Number.isInteger(targetValue) ? String(targetValue) : targetValue.toFixed(1);
        counter.textContent = `${prefix}${final}${suffix}`;
      }
    };
    step();
    observer.unobserve(counter);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(animateCounter);
  }, { threshold: 0.4 });

  counters.forEach(counter => observer.observe(counter));
});
