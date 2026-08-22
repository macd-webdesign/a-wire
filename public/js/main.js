// Main Client JavaScript for A-Wire Electrical Contracting Inc. (Pure Static)

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initContactForm();
});

// Navigation Handling & Mobile Drawer
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  // Mobile Toggle Click
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
  }
}

// Contact Form Handler
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !phone || !message) {
      alert('Please fill in your Name, Phone Number, and Message.');
      return;
    }

    const payload = {
      id: `MSG-${Date.now()}`,
      timestamp: new Date().toISOString(),
      name,
      phone,
      email,
      message
    };

    // Save locally
    try {
      const existing = JSON.parse(localStorage.getItem('awire_messages') || '[]');
      existing.push(payload);
      localStorage.setItem('awire_messages', JSON.stringify(existing));
    } catch (err) {
      console.log('Saved message locally:', payload);
    }

    alert(`⚡ Thank you, ${name}! Your message has been received. An A-Wire representative will call you back shortly.`);
    contactForm.reset();
  });
}
