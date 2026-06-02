document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const business = document.getElementById('company')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.replace(/\s|-/g, '') || '';
    const budget = document.getElementById('budget')?.value || '';
    const service = document.getElementById('service')?.value || '';
    if (!name || !email || !business || !phone) { feedback.textContent = 'Please complete all required fields.'; return }
    const phoneOk = /^\d{10}$/.test(phone);
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) { feedback.textContent = 'Please enter a valid email.'; return }
    if (!phoneOk) { feedback.textContent = 'Please enter a valid 10 digit phone number.'; return }
    feedback.textContent = 'Thanks! Your request has been received. We will follow up shortly.';
    form.reset();
  });
});
