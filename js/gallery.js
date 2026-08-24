// Project Photo Gallery Data & Lightbox Interactive Dialog (16 Authentic A-Wire Projects)

const galleryProjects = [
  {
    id: 1,
    title: 'Agricultural Arc Fault Protection Installation',
    category: 'commercial',
    categoryName: 'Commercial',
    image: 'assets/gallery/barn_agricultural_subpanel.jpg',
    description: 'Agricultural arc fault protection installation in an equestrian facility as an insurance requirement.',
    specs: [
      'Arc fault protection from fires',
      'Protection for existing wiring and devices',
      'Dedicated Arena Lighting & Water Pump Circuits',
      'ESA Certificate of Acceptance'
    ]
  },
  {
    id: 2,
    title: '200A Arena & Facility Eaton Main Service Panel',
    category: 'panel',
    categoryName: 'Panel Upgrades',
    image: 'assets/gallery/arena_eaton_200a_panel.jpg',
    description: '200-Amp main service disconnect panel retrofit with Eaton breakers, typed circuit directory labels (East/West Arena Lighting, Feed Room Heaters, Water Pumps), and surge protection.',
    specs: [
      '200 Amp Eaton Main Service Disconnect Panel',
      'Typed & Printed Professional Circuit Directory Index',
      'Combination AFCI & GFCI Protective Breakers',
      'Passed Electrical Safety Authority (ESA) Inspection'
    ]
  },
  {
    id: 3,
    title: 'Foyer High-Ceiling Rustic Pendant Chandelier',
    category: 'lighting',
    categoryName: 'Lighting Design',
    image: 'assets/gallery/foyer_pendant_chandelier.jpg',
    description: 'High-ceiling grand entrance foyer chandelier installation featuring a rustic lantern pendant fixture, high-reach scaffolding setup, and wall dimmer integration.',
    specs: [
      'High-Ceiling Stairwell Pendant Chandelier Fixture',
      'Multi-Bulb Warm Vintage Edison LED Bulbs',
      'High-Reach Scaffolding & Safety Cable Anchoring',
      'Customized Wall Switch Dimmer Integration'
    ]
  },
  {
    id: 4,
    title: 'Kitchen Remodel LED Potlights & Under-Cabinet Strip Lighting',
    category: 'lighting',
    categoryName: 'Lighting Design',
    image: 'assets/gallery/kitchen_undercabinet_lighting.jpg',
    description: 'Modern kitchen electrical renovation featuring ultra-thin recessed LED potlights, continuous under-cabinet LED task strip lighting over subway tile, and dedicated appliance circuits.',
    specs: [
      '3000K Dimmable Recessed Ceiling LED Potlights',
      'Under-Cabinet Low-Voltage LED Strip Task Lighting',
      'Dedicated Refrigerator, Dishwasher & Microwave Circuits',
      'Countertop GFCI Receptacle Safety Retrofits'
    ]
  },
  {
    id: 5,
    title: 'Open-Concept Living Room Recessed LED Potlights',
    category: 'lighting',
    categoryName: 'Lighting Design',
    image: 'assets/gallery/livingroom_potlights_chandelier.jpg',
    description: 'Open-concept main floor living space lighting design with 6 recessed LED potlights surrounding a central feature geometric wood open frame dining chandelier.',
    specs: [
      '6 Perimeter Recessed 4-Inch LED Potlights',
      'Central Feature Chandelier Junction Box Feed',
      'Dual-Zone Wall Dimmer Controls',
      'Seamless Clean Ceiling Finish & Concealed Wiring'
    ]
  },
  {
    id: 6,
    title: 'Eaton Main Panel Upgrade with AFCI Safety Breakers',
    category: 'panel',
    categoryName: 'Panel Upgrades',
    image: 'assets/gallery/eaton_panel_afci_breakers.jpg',
    description: 'Main distribution panel retrofit featuring Eaton Cutler-Hammer panel, combination Arc-Fault Circuit Interrupters (AFCI) on bedroom circuits, and clean circuit directory labeling.',
    specs: [
      'Eaton Cutler-Hammer Main Breaker Panel',
      'Combination Arc-Fault (AFCI) Safety Breakers',
      'Organized Conductor Bundling & Grounding System',
      'ESA Code Compliance Certification'
    ]
  },
  {
    id: 7,
    title: '200-Amp Siemens Main Breaker Panel Upgrade',
    category: 'panel',
    categoryName: 'Panel Upgrades',
    image: 'assets/gallery/200a_siemens_panel.jpg',
    description: 'Complete 200A main breaker panel replacement with Siemens copper bus bar panel, neat conductor organization, clear breaker directory, and Canadian safety certification.',
    specs: [
      'Siemens 200 Amp Main Breaker Panel',
      'Neat Copper Conductor Wiring & Circuit Directory Labeling',
      'Expansion Capacity for Subpanels & EV Charger Lines',
      'Passed Electrical Safety Authority (ESA) Inspection'
    ]
  },
  {
    id: 8,
    title: 'Siemens BoltShield™ Whole-Home Surge Protection',
    category: 'panel',
    categoryName: 'Panel Upgrades',
    image: 'assets/gallery/surge_protector_boltshield.jpg',
    description: 'Installation of a Siemens BoltShield™ FSPD whole-home surge protection device with green LED operational indicators, safeguarding sensitive electronics from power spikes.',
    specs: [
      'Siemens BoltShield™ FSPD Surge Protective Device',
      'Active Dual LED Status Verification Display',
      'Whole-Home Voltage Spike & Lightning Suppression',
      'Dedicated Service Outlet Receptacle Wiring'
    ]
  },
  {
    id: 9,
    title: 'Heavy-Duty Exterior Utility Meter Base Socket Installation',
    category: 'panel',
    categoryName: 'Panel Upgrades',
    image: 'assets/gallery/exterior_meter_base.jpg',
    description: 'Exterior utility meter base socket installation with heavy-wall rigid PVC conduit feeds and Local Hydro coordination for 200A service upgrades.',
    specs: [
      '200A Weatherproof Meter Socket Housing',
      'Heavy-Wall Rigid PVC Underground Service Conduit',
      'Utility Coordinated Power Shutoff & Reconnection',
      'ESA Clearance & Hydro Disconnect Certificate'
    ]
  },
  {
    id: 10,
    title: 'Laser-Guided Precision Outlet Cutout & Wiring',
    category: 'residential',
    categoryName: 'Residential',
    image: 'assets/gallery/laser_level_outlet_cutout.jpg',
    description: 'High-precision laser-aligned drywall cutout using green beam laser and Klein drywall saw for kitchen island / backsplash outlet installations.',
    specs: [
      'Green Beam Cross-Line Laser Level Alignment',
      'Dust-Controlled Clean Drywall Cutouts',
      'Code-Compliant Kitchen Countertop Receptacles',
      'Minimal Mess & Exacting Wall Placement'
    ]
  },
  {
    id: 11,
    title: 'Luxury Walk-In Closet Recessed LED Potlights',
    category: 'lighting',
    categoryName: 'Lighting Design',
    image: 'assets/gallery/walkin_closet_potlights.jpg',
    description: 'Custom luxury walk-in closet lighting installation featuring flush-mounted LED potlights, IC-rated fixtures, and dimmable controls.',
    specs: [
      'Energy-Efficient Warm 3000K LED Potlights',
      'IC-Rated Sealed Ceiling Canister Housings',
      'Architectural Wardrobe & Shelf Illumination',
      'Custom Wall Dimmer Switch Integration'
    ]
  },
  {
    id: 12,
    title: 'Dedicated EV Charger Breaker & Panel Line',
    category: 'panel',
    categoryName: 'Panel Upgrades',
    image: 'assets/gallery/ev_panel_breaker.jpg',
    description: 'Installed a dedicated 60A double-pole Siemens breaker line inside the main electrical panel for a high-power Level 2 electric vehicle charging system.',
    specs: [
      '60A Double-Pole Siemens Main Panel Circuit Breaker',
      'Dedicated 240V Heavy-Duty EV Charger Circuit',
      'Thermal Inspection & Main Panel Load Calculation',
      'Passed Electrical Safety Authority (ESA) Inspection'
    ]
  },
  {
    id: 13,
    title: 'Level 2 Tesla Wall Connector Installation',
    category: 'ev',
    categoryName: 'EV Chargers',
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
    id: 14,
    title: 'Commercial Office Flat Panel LED Lighting Buildout',
    category: 'commercial',
    categoryName: 'Commercial',
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
    id: 15,
    title: 'Warm Illuminated Entrance Wall Lantern Sconce',
    category: 'lighting',
    categoryName: 'Lighting Design',
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
    id: 16,
    title: 'Modern Architectural Up/Down Exterior Sconce',
    category: 'residential',
    categoryName: 'Residential',
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
          <p>${project.description.substring(0, 110)}...</p>
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
  
  const locEl = document.getElementById('dialog-loc');
  if (locEl) locEl.style.display = 'none';

  document.getElementById('dialog-desc').textContent = project.description;

  const specsList = document.getElementById('dialog-specs');
  specsList.innerHTML = project.specs.map(s => `<li>${s}</li>`).join('');

  dialog.showModal();
}
