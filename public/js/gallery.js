// Gallery JavaScript for A-Wire Electrical Contracting Inc.

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
});

let allProjects = [];

async function initGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  try {
    const res = await fetch('/api/gallery');
    const data = await res.json();
    if (data.success && data.projects) {
      allProjects = data.projects;
      renderGallery(allProjects);
    } else {
      galleryGrid.innerHTML = '<p class="text-center">Unable to load gallery projects.</p>';
    }
  } catch (err) {
    console.error('Error fetching gallery:', err);
    galleryGrid.innerHTML = '<p class="text-center">Error loading gallery images.</p>';
  }

  // Category Filter clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');
      if (filterCategory === 'all') {
        renderGallery(allProjects);
      } else {
        const filtered = allProjects.filter(p => p.category === filterCategory);
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
  const project = allProjects.find(p => p.id === id);
  if (!project) return;

  const dialog = document.getElementById('gallery-dialog');
  const imgEl = document.getElementById('dialog-img');
  const titleEl = document.getElementById('dialog-title');
  const catEl = document.getElementById('dialog-cat');
  const locEl = document.getElementById('dialog-loc');
  const descEl = document.getElementById('dialog-desc');
  const specsEl = document.getElementById('dialog-specs');
  const quoteBtn = document.getElementById('dialog-quote-btn');

  imgEl.src = project.image;
  imgEl.alt = project.title;
  titleEl.textContent = project.title;
  catEl.textContent = project.categoryLabel;
  locEl.textContent = `📍 ${project.location}`;
  descEl.textContent = project.description;

  specsEl.innerHTML = project.specs.map(spec => `<li>${spec}</li>`).join('');

  if (quoteBtn) {
    quoteBtn.onclick = () => {
      dialog.close();
      const quoteSection = document.getElementById('quote');
      if (quoteSection) {
        window.scrollTo({
          top: quoteSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    };
  }

  if (dialog.showModal) {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', 'true');
  }
};
