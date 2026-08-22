// Static Quote Form JavaScript for A-Wire Electrical Contracting Inc.

document.addEventListener('DOMContentLoaded', () => {
  initQuoteForm();
});

function initQuoteForm() {
  const form = document.getElementById('quote-form');
  const submitBtn = document.getElementById('quote-submit-btn');
  const successDialog = document.getElementById('success-dialog');
  const closeSuccessBtn = document.getElementById('success-close-btn');

  if (closeSuccessBtn && successDialog) {
    closeSuccessBtn.addEventListener('click', () => successDialog.close());
    successDialog.addEventListener('click', (e) => {
      const rect = successDialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        successDialog.close();
      }
    });
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const propertyType = form.querySelector('input[name="propertyType"]:checked')?.value || 'Residential';
    const urgencySelect = document.getElementById('urgency-select');
    const urgency = urgencySelect ? urgencySelect.value : 'Standard';
    
    // Checked services
    const checkedServiceEls = form.querySelectorAll('input[name="services"]:checked');
    const services = Array.from(checkedServiceEls).map(el => el.value);

    const name = document.getElementById('quote-name').value.trim();
    const phone = document.getElementById('quote-phone').value.trim();
    const email = document.getElementById('quote-email').value.trim();
    const address = document.getElementById('quote-address').value.trim();
    const details = document.getElementById('quote-details').value.trim();

    if (!name || !phone) {
      alert('Please provide your Full Name and Phone Number to request a quote.');
      return;
    }

    if (services.length === 0) {
      alert('Please check at least one electrical service (e.g., Panel Upgrade, EV Charger, Lighting, etc.).');
      return;
    }

    const quoteId = `QUOTE-${Date.now()}`;
    const payload = {
      id: quoteId,
      timestamp: new Date().toISOString(),
      name,
      phone,
      email,
      address,
      propertyType,
      services,
      urgency,
      details
    };

    // Save locally for testing/persistence
    try {
      const existing = JSON.parse(localStorage.getItem('awire_quotes') || '[]');
      existing.push(payload);
      localStorage.setItem('awire_quotes', JSON.stringify(existing));
    } catch (err) {
      console.log('Saved quote locally:', payload);
    }

    // Display Success Modal
    const messageEl = document.getElementById('success-message');
    const refIdEl = document.getElementById('success-ref-id');

    if (messageEl) {
      messageEl.textContent = `Thank you, ${name}! Your quote request has been received. An A-Wire certified electrician will review your project details and contact you shortly.`;
    }
    if (refIdEl) refIdEl.textContent = quoteId;

    if (successDialog) {
      if (successDialog.showModal) {
        successDialog.showModal();
      } else {
        successDialog.setAttribute('open', 'true');
      }
    } else {
      alert(`⚡ Quote Submitted Successfully!\nReference ID: ${quoteId}`);
    }

    form.reset();
  });
}
