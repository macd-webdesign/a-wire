// Main Client JavaScript for A-Wire Electrical Contracting Inc.

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initContactForm();
  initServicePickers();
});

// Navigation Handling & Mobile Drawer
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page-section');

  // Mobile Toggle Click
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Smooth Scroll & Active Link highlighting
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }

      const targetId = link.getAttribute('data-target');
      if (targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          e.preventDefault();
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Scroll spy to update active state
  window.addEventListener('scroll', () => {
    let currentSection = 'home';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-target') === currentSection) {
        link.classList.add('active');
      }
    });
  });
}

// Service Selection buttons that pre-fill Quote Form
function initServicePickers() {
  const selectBtns = document.querySelectorAll('.select-service-btn');
  selectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-service');
      const propertyTypeRadio = document.querySelector(`input[name="propertyType"][value="${serviceName.includes('Commercial') ? 'Commercial' : 'Residential'}"]`);
      if (propertyTypeRadio) {
        propertyTypeRadio.checked = true;
      }
    });
  });
}

// Contact Form Handler
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !phone || !message) {
      alert('Please fill in your Name, Phone Number, and Message.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, message })
      });

      const data = await response.json();
      if (data.success) {
        alert('⚡ Thank you! Your message has been sent successfully. An A-Wire representative will call you back shortly.');
        contactForm.reset();
      } else {
        alert(data.message || 'Error sending message. Please try again or call 905 955-5455.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      alert('Unable to reach server. Please call 905 955-5455 for immediate assistance.');
    }
  });
}
