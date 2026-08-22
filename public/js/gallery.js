// Gallery JavaScript for A-Wire Electrical Contracting Inc. (Pure Static)

const galleryProjects = [
  {
    id: 1,
    title: '200A Electrical Panel Upgrade & Clean Rewire',
    category: 'panel',
    categoryLabel: 'Panel Upgrades',
    description: 'Complete replacement of obsolete fused panel with heavy-duty 200-Amp breaker panel, surge protector, and neatly dressed copper wiring.',
    image: '/assets/gallery/panel_upgrade.jpg',
    specs: ['200 Amps Service', 'Whole-Home Surge Protector', 'ESA Inspected & Passed'],
    location: 'Mississauga, ON'
  },
  {
    id: 2,
    title: 'Dual Level 2 Tesla EV Charger Installation',
    category: 'ev',
    categoryLabel: 'EV Chargers',
    description: 'High-speed 48A wall connector installation in a double garage with EMT metallic conduit and dedicated 60A circuit breaker.',
    image: '/assets/gallery/ev_charger.jpg',
    specs: ['48-Amp Level 2 Charging', 'Hardwired Dedicated Line', 'Code Compliant Grounding'],
    location: 'Oakville, ON'
  },
  {
    id: 3,
    title: 'Commercial Corporate Office Architectural LED Lighting',
    category: 'commercial',
    categoryLabel: 'Commercial Electrical',
    description: 'Turnkey interior lighting design featuring suspended linear LED luminaires, motion sensors, and dimmable zone controllers for an open office space.',
    image: '/assets/gallery/commercial_lighting.jpg',
    specs: ['0-10V Smart Dimmable LED', 'Energy Star Rated', '0-100% Daylight Harvesting'],
    location: 'Toronto, ON'
  },
  {
    id: 4,
    title: 'Luxury Residence Soffit & Architectural Dusk Lighting',
    category: 'lighting',
    categoryLabel: 'Lighting Design',
    description: 'Custom exterior architectural accent lighting, warm LED soffit pot lights, smart astronomical timer, and waterproof low-voltage garden uplighting.',
    image: '/assets/gallery/exterior_lighting.jpg',
    specs: ['Smart App Control', '3000K Warm White LEDs', 'Weatherproof IP67 Rating'],
    location: 'Brampton, ON'
  },
  {
    id: 5,
    title: 'Commercial Tenant Buildout & Power Distribution',
    category: 'commercial',
    categoryLabel: 'Commercial Electrical',
    description: 'Full electrical rough-in, subpanel distribution, dedicated server room power circuits, and high-bay lighting for commercial retail space.',
    image: '/assets/gallery/commercial_lighting.jpg',
    specs: ['Three-Phase 120/208V', 'Dedicated Server UPS Feeds', 'Fire Alarm Integration'],
    location: 'Vaughan, ON'
  },
  {
    id: 6,
    title: 'Whole-Home Safety Inspection & Troubleshooting',
    category: 'residential',
    categoryLabel: 'Residential Electrical',
    description: 'Comprehensive electrical safety audit, thermal scan, arc-fault (AFCI) breaker retrofit, and grounding verification for home buyer closing.',
    image: '/assets/gallery/panel_upgrade.jpg',
    specs: ['Infrared Thermal Scan', 'AFCI/GFCI Protection', 'ECRA/ESA Safety Report'],
    location: 'Milton, ON'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
});

function initGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Initial render
  renderGallery(galleryProjects);

  // Category Filter clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');
      if (filterCategory === 'all') {
        renderGallery(galleryProjects);
      } else {
        const filtered = galleryProjects.filter(p => p.category === filterCategory);
        renderGallery(filtered);
      }
    });
  });

  // Modal close handlers
  const dialog = document.getElementById('gallery-dialog');
  const closeBtn = document.getElementById('dialog-close');
  if (closeBtn && dialog) {
    closeBtn.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        dialog.close();
      }
    });
  }
}

function renderGallery(projects) {
  const galleryGrid = document.getElementById('gallery-grid');
  if (!galleryGrid) return;

  if (!projects || projects.length === 0) {
    galleryGrid.innerHTML = '<p class="text-center" style="grid-column: 1/-1;">No projects found in this category.</p>';
    return;
  }

  galleryGrid.innerHTML = projects.map(p => `
    <div class="gallery-card">
      <div class="gallery-img-wrap">
        <img src="${p.image}" alt="${p.title}" class="gallery-img" loading="lazy" width="400" height="300">
        <span class="gallery-cat-tag">${p.categoryLabel}</span>
      </div>
      <div class="gallery-card-body">
        <h4>${p.title}</h4>
        <p class="gallery-loc">📍 ${p.location}</p>
        <p>${p.description}</p>
        <button type="button" class="btn btn-outline view-project-btn" onclick="openGalleryModal(${p.id})">
          <span>View Project Details</span>
        </button>
      </div>
    </div>
  `).join('');
}

// Lightbox Dialog Opener
window.openGalleryModal = function(id) {
  const project = galleryProjects.find(p => p.id === id);
  if (!project) return;

  const dialog = document.getElementById('gallery-dialog');
  const imgEl = document.getElementById('dialog-img');
  const titleEl = document.getElementById('dialog-title');
  const catEl = document.getElementById('dialog-cat');
  const locEl = document.getElementById('dialog-loc');
  const descEl = document.getElementById('dialog-desc');
  const specsEl = document.getElementById('dialog-specs');
  const quoteBtn = document.getElementById('dialog-quote-btn');

  if (imgEl) { imgEl.src = project.image; imgEl.alt = project.title; }
  if (titleEl) titleEl.textContent = project.title;
  if (catEl) catEl.textContent = project.categoryLabel;
  if (locEl) locEl.textContent = `📍 ${project.location}`;
  if (descEl) descEl.textContent = project.description;

  if (specsEl) {
    specsEl.innerHTML = project.specs.map(spec => `<li>${spec}</li>`).join('');
  }

  if (quoteBtn) {
    quoteBtn.onclick = () => {
      dialog.close();
      window.location.href = '/quote.html';
    };
  }

  if (dialog) {
    if (dialog.showModal) {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', 'true');
    }
  }
};
