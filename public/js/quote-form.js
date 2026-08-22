// Interactive Quote Form JavaScript for A-Wire Electrical Contracting Inc.

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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const propertyType = form.querySelector('input[name="propertyType"]:checked')?.value || 'Residential';
    const urgency = document.getElementById('urgency-select').value;
    
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

    // Submit payload
    const payload = {
      name,
      phone,
      email,
      address,
      propertyType,
      services,
      urgency,
      details
    };

    // Disable button loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending Quote Request...</span>';

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        // Show success modal
        const messageEl = document.getElementById('success-message');
        const refIdEl = document.getElementById('success-ref-id');

        if (messageEl) messageEl.textContent = data.message;
        if (refIdEl) refIdEl.textContent = data.quoteId;

        if (successDialog) {
          if (successDialog.showModal) {
            successDialog.showModal();
          } else {
            successDialog.setAttribute('open', 'true');
          }
        } else {
          alert(`⚡ Success! Quote Reference ID: ${data.quoteId}`);
        }

        form.reset();
      } else {
        alert(data.message || 'Failed to submit quote. Please try again or call 905 955-5455.');
      }
    } catch (err) {
      console.error('Quote form error:', err);
      alert('Error connecting to server. Please call 905 955-5455 to place your request directly.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}
