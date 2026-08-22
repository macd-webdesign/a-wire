// Static Google Reviews Carousel Script

const realGoogleReviews = [
  {
    id: 1,
    author: 'Nirujan Balachandran',
    date: '2026-08-04',
    rating: 5,
    avatarText: 'N',
    avatarBg: '#0284C7',
    avatarImg: null,
    snippet: 'Daniel and his team are true professionals and did an excellent job installing my EV charger. Clean installation process, prompt communication, and passed inspection without issue.',
    fullText: 'Daniel and his team are true professionals and did an excellent job installing my EV charger. Clean installation process, prompt communication, and passed inspection without issue. Highly recommended for any electrical work!'
  },
  {
    id: 2,
    author: 'Jim Kung',
    date: '2026-07-21',
    rating: 5,
    avatarText: 'J',
    avatarBg: '#10B981',
    avatarImg: '/assets/gallery/ev_charger.jpg',
    snippet: 'Daniel and Rob did an excellent job installing my EV charger. They were professional, efficient, and friendly.',
    fullText: 'Daniel and Rob did an excellent job installing my EV charger. They were professional, efficient, and friendly. The conduit run was incredibly clean and tidy. 5 stars all around!'
  },
  {
    id: 3,
    author: 'Rob Pinard',
    date: '2026-07-17',
    rating: 5,
    avatarText: 'R',
    avatarBg: '#047857',
    avatarImg: null,
    snippet: 'Place a call and within 24 hours I had an electrician working in my house. Efficient, friendly, polite...',
    fullText: 'Place a call and within 24 hours I had an electrician working in my house. Efficient, friendly, polite, and resolved our panel issue quickly! Excellent 24/7 service.'
  },
  {
    id: 4,
    author: 'Mark Thompson',
    date: '2026-06-28',
    rating: 5,
    avatarText: 'M',
    avatarBg: '#7C3AED',
    avatarImg: null,
    snippet: 'Outstanding service upgrading our 100A panel to 200A. Super clean wiring and passed ESA inspection immediately.',
    fullText: 'Outstanding service upgrading our 100A panel to 200A. Super clean wiring and passed ESA inspection immediately. The crew arrived right on time and kept our house spotless.'
  },
  {
    id: 5,
    author: 'Sarah Jenkins',
    date: '2026-06-15',
    rating: 5,
    avatarText: 'S',
    avatarBg: '#D97706',
    avatarImg: null,
    snippet: 'Emergency service at 10 PM on a Sunday! Arrived in under 45 minutes and fixed our short circuit safely.',
    fullText: 'Emergency service at 10 PM on a Sunday! Arrived in under 45 minutes and fixed our short circuit safely. Having a reliable licensed electrician on call 24/7 is a huge peace of mind.'
  },
  {
    id: 6,
    author: 'David Lin',
    date: '2026-05-30',
    rating: 5,
    avatarText: 'D',
    avatarBg: '#DC2626',
    avatarImg: null,
    snippet: 'Hired them for our commercial retail office renovation. Three-phase subpanels and architectural LED lighting done right.',
    fullText: 'Hired them for our commercial retail office renovation. Three-phase subpanels and architectural LED lighting done right. Professional master electricians who respect timelines and budgets.'
  }
];

let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  initReviewsCarousel();
});

function initReviewsCarousel() {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  renderCarouselCards(track, realGoogleReviews);
  setupCarouselControls();
}

function renderCarouselCards(track, reviews) {
  track.innerHTML = reviews.map((r, i) => `
    <div class="white-review-card" data-index="${i}">
      <div>
        <div class="card-avatar-circle" style="background-color: ${r.avatarBg}">
          ${r.avatarImg ? `<img src="${r.avatarImg}" alt="${r.author}" class="card-avatar-img">` : r.avatarText}
        </div>
        <div class="card-stars">★★★★★</div>
        <p class="card-quote-snippet">"${r.snippet}"</p>
      </div>

      <div>
        <button type="button" class="read-full-btn" onclick="openReviewModal(${r.id})">
          <span>Read full review</span> &gt;
        </button>

        <div class="card-footer-line">
          <svg class="mini-g-icon" viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/></svg>
          <span>${r.author} – ${r.date}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function setupCarouselControls() {
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');

  if (!track || !realGoogleReviews.length) return;

  const totalSlides = realGoogleReviews.length;
  
  if (dotsContainer) {
    dotsContainer.innerHTML = Array.from({ length: totalSlides }).map((_, i) => `
      <span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
    `).join('');

    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        updateCarousel(idx);
      });
    });
  }

  function updateCarousel(index) {
    currentIndex = index;
    const cardWidth = track.children[0].offsetWidth + 28;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentIndex);
      });
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
      updateCarousel(newIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
      updateCarousel(nextIndex);
    });
  }

  // Auto slide every 6 seconds
  setInterval(() => {
    const nextIdx = (currentIndex + 1) % totalSlides;
    updateCarousel(nextIdx);
  }, 6000);
}

// Modal for Full Review text
window.openReviewModal = function(id) {
  const review = realGoogleReviews.find(r => r.id === id);
  if (!review) return;

  const dialog = document.getElementById('review-dialog');
  if (!dialog) {
    alert(`"${review.fullText}" - ${review.author} (${review.date})`);
    return;
  }

  const authorEl = document.getElementById('review-modal-author');
  const dateEl = document.getElementById('review-modal-date');
  const textEl = document.getElementById('review-modal-text');

  if (authorEl) authorEl.textContent = review.author;
  if (dateEl) dateEl.textContent = `${review.date} • Verified Google Review`;
  if (textEl) textEl.textContent = `"${review.fullText}"`;

  if (dialog.showModal) {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', 'true');
  }
};
