document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('mobileMenu')?.classList.remove('active');
    });
  });

  window.addEventListener('scroll', () => {
    document.querySelector('.site-header').classList.toggle('scrolled', window.scrollY > 80);
    document.getElementById('backToTop')?.classList.toggle('visible', window.scrollY > 500);
  });

  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  const setMobileMenuState = (isOpen) => {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  };

  hamburger?.addEventListener('click', () => {
    setMobileMenuState(!mobileMenu?.classList.contains('active'));
  });
  mobileClose?.addEventListener('click', () => {
    setMobileMenuState(false);
  });
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => setMobileMenuState(false));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') setMobileMenuState(false);
  });
  mobileMenu?.addEventListener('click', e => {
    if (e.target === mobileMenu) setMobileMenuState(false);
  });

  document.getElementById('backToTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const simulatorButton = document.getElementById('run-simulator');
  const trafficInput = document.getElementById('traffic');
  const conversionInput = document.getElementById('conversion');
  const dealSizeInput = document.getElementById('dealSize');
  const qualityInput = document.getElementById('quality');
  const resultLeads = document.getElementById('result-leads');
  const resultPipeline = document.getElementById('result-pipeline');

  function formatCurrency(value) {
    return '₹' + value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }

  function updateSimulator() {
    const traffic = Number(trafficInput?.value) || 0;
    const conversion = Number(conversionInput?.value) / 100 || 0;
    const dealSize = Number(dealSizeInput?.value) || 0;
    const qualityLift = Number(qualityInput?.value) / 100 || 0;
    const monthlyLeads = Math.max(0, traffic * conversion);
    const qualifiedLeads = Math.round(monthlyLeads * (1 + qualityLift));
    const pipeline = Math.round(qualifiedLeads * dealSize * 3 * 0.42);
    if (resultLeads) resultLeads.textContent = qualifiedLeads.toLocaleString();
    if (resultPipeline) resultPipeline.textContent = formatCurrency(pipeline);
  }

  simulatorButton?.addEventListener('click', updateSimulator);
  updateSimulator();

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  document.querySelectorAll('.pain-grid .pain-card, .pricing-grid .pricing-card').forEach((el, i) => el.style.transitionDelay = `${i * 0.1}s`);

  const notifications = [
    {name: 'Rohit from Hyderabad', plan: 'Growth Engine'},
    {name: 'Sneha from Mumbai', plan: 'Revenue Accelerator'},
    {name: 'Arjun from Bangalore', plan: 'Brand Kickstart'},
    {name: 'Kavya from Chennai', plan: 'Growth Engine'},
    {name: 'Dev from Pune', plan: 'Infinity Enterprise'}
  ];
  let nIndex = 0;
  function showNotification() {
    const el = document.getElementById('socialProof');
    if (!el) return;
    const n = notifications[nIndex % notifications.length];
    el.querySelector('strong').textContent = n.name;
    el.querySelector('p').textContent = `just signed up for ${n.plan} — 2 min ago`;
    el.querySelector('.sp-avatar').textContent = n.name.split(' ')[0][0] + (n.name.split(' ')[1]?.[0] || '');
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 5000);
    nIndex++;
  }
  setTimeout(() => { showNotification(); setInterval(showNotification, 45000); }, 8000);

  const billingToggle = document.getElementById('billingToggle');
  billingToggle?.addEventListener('change', function() { const isQuarterly = this.checked; document.querySelectorAll('.price-amount').forEach(el => { el.textContent = isQuarterly ? el.dataset.quarterly : el.dataset.monthly; }); });

  const compareToggle = document.getElementById('compareToggle');
  compareToggle?.addEventListener('click', () => { const table = document.getElementById('comparisonTable'); const btn = document.getElementById('compareToggle'); const isHidden = !table || table.style.display === 'none'; if (table) table.style.display = isHidden ? 'block' : 'none'; if (btn) btn.textContent = isHidden ? 'Hide Comparison ▲' : 'View Full Comparison ▼'; });
});
