// Authentic Google Reviews Dataset for A-Wire Electrical Contracting Inc. (First Name & Last Initial for Privacy)

const realGoogleReviews = [
  {
    id: 1,
    author: 'Steve M.',
    reviewsCount: '7 reviews',
    date: 'Recent',
    rating: 5,
    avatarText: 'S',
    avatarBg: '#0097A7', // Teal circle
    avatarImg: null,
    snippet: 'A-Wire helped us with a faulty breaker and installed a light fixture. Their work fast very quick and professional. We\'d definitely have them back again...',
    fullText: 'A-Wire helped us with a faulty breaker and installed a light fixture. Their work fast very quick and professional. We\'d definitely have them back again for other projects. Highly recommended.'
  },
  {
    id: 2,
    author: 'Ingrid G.',
    reviewsCount: '5 reviews',
    date: '5 months ago',
    rating: 5,
    avatarText: 'I',
    avatarBg: '#C2185B', // Magenta/Pink circle
    avatarImg: null,
    snippet: 'My first experience with A-Wire Electrical Contracting was very positive. Ashan works in an efficient, professional manner and provided great suggestions...',
    fullText: 'My first experience with A-Wire Electrical Contracting was very positive. Ashan works in an efficient, professional manner and, when asked, provided me with great suggestions for some of my lighting needs. He was able to convert my previous florescent lighting to more energy efficient LED lighting, for six fixtures, at a very reasonable price. I would HIGHLY recommend Ashan and A-Wire Electrical Contracting.'
  },
  {
    id: 3,
    author: 'Sahan T.',
    reviewsCount: 'Local Guide · 35 reviews · 29 photos',
    date: '8 months ago',
    rating: 5,
    avatarText: 'S',
    avatarBg: '#15803D', // Green circle
    avatarImg: null,
    snippet: 'We had a new kitchen island and a coffee bar wired with electrical outlets. The electrician was very creative and fed the wire through our condo ceiling safely...',
    fullText: 'We had a new kitchen island and a coffee bar wired with electrical outlets. The electrician was very creative and fed the wire through our condo ceiling safely and securely with minimal to almost no mess. I was so thankful we had him for our project because of how precise and clean he was. He also installed potlights in our walk-in closet and did an amazing job. Thank you A-wire!'
  },
  {
    id: 4,
    author: 'Dave D.',
    reviewsCount: 'Local Guide · 32 reviews · 12 photos',
    date: 'Edited 3 weeks ago',
    rating: 5,
    avatarText: 'D',
    avatarBg: '#854D0E', // Brown circle with local guide badge
    avatarImg: null,
    snippet: 'Had an old GFI receptacle replaced. Also had a dusk to dawn timer put in for the outdoor lights. Great job 👍 Update added under counter LED strip lights.',
    fullText: 'Had an old GFI receptacle replaced. Also had a dusk to dawn timer put in for the outdoor lights. Great job 👍 Update added under counter LED strip lights.\n\nPositive: Quality, Value\nServices: Outdoor lighting installation, Electrical outlet & switch relocation'
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
      updateCarousel(newIndex);
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
  if (dateEl) dateEl.textContent = `${review.author} • ${review.reviewsCount} • ${review.date}`;
  if (textEl) textEl.textContent = `"${review.fullText}"`;

  if (dialog.showModal) {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', 'true');
  }
};
