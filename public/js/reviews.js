// Interactive Google Reviews Carousel Script (Matching Screenshot)

document.addEventListener('DOMContentLoaded', () => {
  initReviewsCarousel();
});

let reviewsData = [];
let currentIndex = 0;

async function initReviewsCarousel() {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  try {
    const res = await fetch('/api/reviews');
    const data = await res.json();

    if (data.success && data.reviews) {
      reviewsData = data.reviews;
      renderCarouselCards(track, reviewsData);
      setupCarouselControls();
    }
  } catch (err) {
    console.error('Error loading Google reviews:', err);
  }
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

  if (!track || !reviewsData.length) return;

  const totalSlides = reviewsData.length;
  
  // Build dots
  dotsContainer.innerHTML = Array.from({ length: totalSlides }).map((_, i) => `
    <span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
  `).join('');

  const dots = dotsContainer.querySelectorAll('.dot');

  function updateCarousel(index) {
    currentIndex = index;
    const cardWidth = track.children[0].offsetWidth + 28; // card width + gap
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
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

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      updateCarousel(idx);
    });
  });

  // Auto slide every 6 seconds
  setInterval(() => {
    const nextIdx = (currentIndex + 1) % totalSlides;
    updateCarousel(nextIdx);
  }, 6000);
}

// Modal for Full Review text
window.openReviewModal = function(id) {
  const review = reviewsData.find(r => r.id === id);
  if (!review) return;

  const dialog = document.getElementById('review-dialog');
  if (!dialog) {
    alert(`"${review.fullText}" - ${review.author} (${review.date})`);
    return;
  }

  document.getElementById('review-modal-author').textContent = review.author;
  document.getElementById('review-modal-date').textContent = `${review.date} • Verified Google Review`;
  document.getElementById('review-modal-text').textContent = `"${review.fullText}"`;

  if (dialog.showModal) {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', 'true');
  }
};
