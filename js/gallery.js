// Project Photo Gallery Data & Lightbox Interactive Dialog

const galleryProjects = [
  {
    id: 1,
    title: '200A Electrical Panel Upgrade & Clean Rewire',
    category: 'panel',
    categoryName: 'Panel Upgrades',
    location: 'Mississauga, ON',
    image: 'assets/gallery/panel_upgrade.jpg',
    description: 'Replaced an obsolete 100A fuse box with a heavy-duty 200 Amp Siemens main breaker panel, copper wiring, whole-home surge protector, and ESA permit inspection.',
    specs: [
      '200 Amp Siemens Main Breaker Panel',
      'Whole-Home Surge Protection Device (SPD)',
      'Subpanel expansion for future basement suite',
      'Passed Electrical Safety Authority (ESA) Inspection'
    ]
  },
  {
    id: 2,
    title: 'Dual Level 2 Tesla EV Charger Installation',
    category: 'ev',
    categoryName: 'EV Chargers',
    location: 'Oakville, ON',
    image: 'assets/gallery/ev_charger.jpg',
    description: 'Installed twin 48-Amp Tesla Wall Connectors in a residential double garage with EMT metal conduit runs and dedicated 60A circuit breakers.',
    specs: [
      '48A continuous charging power (up to 44 miles of range per hour)',
      'Surface-mounted EMT metallic conduit',
      '60-Amp heavy-duty double-pole breaker',
      'Load management setup for simultaneous vehicle charging'
    ]
  },
  {
    id: 3,
    title: 'Commercial Corporate Office Architectural LED Lighting',
    category: 'commercial',
    categoryName: 'Commercial',
    location: 'Toronto, ON',
    image: 'assets/gallery/commercial_lighting.jpg',
    description: 'Designed and installed modern suspended linear LED luminaires, 0-10V dimming controls, and daylight harvesting sensors for a 4,500 sq ft office space.',
    specs: [
      'Energy-efficient 4000K daylight LED linear fixtures',
      '0-10V architectural wall dimmers',
      'Occupancy motion sensors for automatic shutoff',
      'Commercial three-phase panel distribution'
    ]
  },
  {
    id: 4,
    title: 'Luxury Residence Soffit & Architectural Accent Lighting',
    category: 'lighting',
    categoryName: 'Lighting Design',
    location: 'Brampton, ON',
    image: 'assets/gallery/exterior_lighting.jpg',
    description: 'Custom exterior LED soffit recessed lighting installation with automated astronomical timer and dimmable warmth control.',
    specs: [
      '3000K warm white outdoor LED pot lights',
      'Weather-sealed IP65 aluminum trim rings',
      'Smart astronomical timer (dusk-to-dawn auto activation)',
      'Under-cabinet & landscape uplighting'
    ]
  },
  {
    id: 5,
    title: 'Commercial Retail Unit Electrical Buildout',
    category: 'commercial',
    categoryName: 'Commercial',
    location: 'Vaughan, ON',
    image: 'assets/gallery/commercial_lighting.jpg',
    description: 'Full electrical system design for new retail tenant unit, including three-phase 120/208V main panel, POS circuits, and emergency egress lighting.',
    specs: [
      'Three-phase 120/208V 200A distribution panel',
      'Dedicated POS & server room UPS feeds',
      'Emergency battery pack exit signs & bug-eyes',
      'ESA commercial safety compliance certification'
    ]
  },
  {
    id: 6,
    title: 'Residential Subpanel & Potlight Retrofit',
    category: 'residential',
    categoryName: 'Residential',
    location: 'Milton, ON',
    image: 'assets/gallery/panel_upgrade.jpg',
    description: 'Finished basement electrical package featuring subpanel installation, 18 ultra-thin LED recessed potlights, and AFCI safety breakers.',
    specs: [
      '100-Amp feeder subpanel for basement unit',
      'Ultra-thin 4-inch IC-rated LED potlights',
      'Combination Arc-Fault Circuit Interrupters (AFCI)',
      'Tamper-resistant decora outlets'
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderGallery('all');
  initFilterButtons();
  initLightboxDialog();
});

function renderGallery(filterCategory) {
  const gridContainer = document.getElementById('gallery-grid');
  if (!gridContainer) return;

  const filteredProjects = filterCategory === 'all' 
    ? galleryProjects 
    : galleryProjects.filter(p => p.category === filterCategory || (filterCategory === 'residential' && (p.category === 'panel' || p.category === 'ev' || p.category === 'lighting')));

  gridContainer.innerHTML = filteredProjects.map(project => `
    <div class="gallery-card" data-id="${project.id}">
      <div class="gallery-img-wrap">
        <img src="${project.image}" alt="${project.title}" class="gallery-img" loading="lazy">
        <span class="gallery-cat-tag">${project.categoryName}</span>
      </div>
      <div class="gallery-card-body">
        <div>
          <h4>${project.title}</h4>
          <p class="gallery-loc">📍 ${project.location}</p>
          <p>${project.description.substring(0, 100)}...</p>
        </div>
        <button type="button" class="btn btn-secondary btn-block view-project-btn" data-id="${project.id}">
          <span>View Project Details</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `).join('');

  // Attach event listeners to project detail buttons
  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projId = parseInt(e.currentTarget.getAttribute('data-id'), 10);
      openLightboxDialog(projId);
    });
  });
}

function initFilterButtons() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderGallery(filter);
    });
  });
}

function initLightboxDialog() {
  const dialog = document.getElementById('gallery-dialog');
  const closeBtn = document.getElementById('dialog-close');
  const quoteBtn = document.getElementById('dialog-quote-btn');

  if (!dialog) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => dialog.close());
  }

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  if (quoteBtn) {
    quoteBtn.addEventListener('click', () => {
      dialog.close();
      window.location.href = 'quote.html';
    });
  }
}

function openLightboxDialog(projectId) {
  const dialog = document.getElementById('gallery-dialog');
  const project = galleryProjects.find(p => p.id === projectId);
  if (!dialog || !project) return;

  document.getElementById('dialog-img').src = project.image;
  document.getElementById('dialog-img').alt = project.title;
  document.getElementById('dialog-cat').textContent = project.categoryName;
  document.getElementById('dialog-title').textContent = project.title;
  document.getElementById('dialog-loc').textContent = `📍 ${project.location}`;
  document.getElementById('dialog-desc').textContent = project.description;

  const specsList = document.getElementById('dialog-specs');
  specsList.innerHTML = project.specs.map(s => `<li>${s}</li>`).join('');

  dialog.showModal();
}
