// Project Photo Gallery Data & Lightbox Interactive Dialog (A-Wire Authentic Projects)

const galleryProjects = [
  {
    id: 1,
    title: 'Dedicated EV Charger Breaker & Panel Line Installation',
    category: 'panel',
    categoryName: 'Panel Upgrades',
    location: 'Mississauga, ON',
    image: 'assets/gallery/ev_panel_breaker.jpg',
    description: 'Installed a dedicated 60A double-pole Siemens breaker line inside the main electrical panel for a high-power Level 2 electric vehicle charging system. Fully labelled and ESA code-compliant.',
    specs: [
      '60A Double-Pole Siemens Main Panel Circuit Breaker',
      'Dedicated 240V Heavy-Duty EV Charger Circuit',
      'Thermal Inspection & Main Panel Load Calculation',
      'Passed Electrical Safety Authority (ESA) Inspection'
    ]
  },
  {
    id: 2,
    title: 'Level 2 Tesla Wall Connector Installation',
    category: 'ev',
    categoryName: 'EV Chargers',
    location: 'Oakville, ON',
    image: 'assets/gallery/tesla_ev_charger.jpg',
    description: 'Outdoor weatherproof installation of a Level 2 Tesla Wall Connector with dedicated 240V feed, custom wood surface mounting, and status LED green indicator verification.',
    specs: [
      'Level 2 Tesla High-Power Wall Connector (up to 44 mi/hr charge rate)',
      'Weatherproof Exterior Mounting on Wood Accent Facade',
      'Heavy-Duty Conductor Conduit Run',
      'Full ESA Certificate & Safety Verification'
    ]
  },
  {
    id: 3,
    title: 'Commercial Office Flat Panel LED Lighting Buildout',
    category: 'commercial',
    categoryName: 'Commercial',
    location: 'Toronto, ON',
    image: 'assets/gallery/commercial_office_lighting.jpg',
    description: 'Complete commercial office & training room electrical retrofit featuring energy-efficient 2x4 LED flat troffer panel lights, drop ceiling integration, projector wiring, and perimeter desk outlets.',
    specs: [
      '2x4 Energy-Efficient 4000K Neutral White LED Troffer Panels',
      'Drop Ceiling Grid Flush-Recessed Installation',
      'Perimeter Workstation & Ceiling Projector Power Feeds',
      'Commercial Panel Distribution & Safety Compliance Audit'
    ]
  },
  {
    id: 4,
    title: 'Warm Illuminated Entrance Wall Lantern Sconce',
    category: 'lighting',
    categoryName: 'Lighting Design',
    location: 'Brampton, ON',
    image: 'assets/gallery/exterior_lantern_sconce.jpg',
    description: 'Precision exterior lighting installation featuring a warm architectural lantern sconce mounted on a classic red brick entrance facade.',
    specs: [
      'Weather-Sealed Exterior Fixture Mounting on Brick Wall',
      'Warm 3000K Ambient LED Illumination',
      'Concealed Weatherproof Junction Box Wiring',
      'Smart Dusk-to-Dawn Control Switch Integration'
    ]
  },
  {
    id: 5,
    title: 'Modern Architectural Up/Down Exterior Sconce',
    category: 'residential',
    categoryName: 'Residential',
    location: 'Milton, ON',
    image: 'assets/gallery/modern_updown_sconce.jpg',
    description: 'Modern dual-beam LED up/down architectural sconce installed on a red brick garage column for enhanced home curb appeal and security.',
    specs: [
      'Dual Up & Down Architectural Beam Pattern',
      'Heavy-Duty Weatherproof Aluminum Housing',
      'Energy-Saving Integrated Long-Life LED Module',
      'Enhanced Perimeter Security & Nighttime Aesthetics'
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
