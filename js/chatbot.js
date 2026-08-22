// Site-Wide Smart AI Knowledge Engine & Chatbot for A-Wire Electrical Contracting Inc.

document.addEventListener('DOMContentLoaded', () => {
  initChatbot();
});

// Comprehensive Knowledge Index of the Entire Website
const siteKnowledgeBase = {
  company: {
    name: 'A-Wire Electrical Contracting Inc.',
    esaNumber: 'ECRA/ESA# 7016330',
    tagline: 'POWERING YOUR HOME. ENERGIZING YOUR BUSINESS.',
    subtagline: 'Safe. Reliable. Professional. Electrical solutions you can count on.',
    slogan: 'Big or small, we wire it all. Residential. Commercial. Always professional.',
    phone: '905 955-5455',
    email: 'awire.ec@gmail.com',
    hours: '24/7 Emergency Service (Day or Night). Standard Dispatch: Mon – Sat 7:00 AM – 7:00 PM.',
    cities: ['Mississauga', 'Oakville', 'Brampton', 'Milton', 'Vaughan', 'Etobicoke', 'Toronto', 'Greater Toronto Area (GTA)']
  },

  services: {
    residential: [
      { name: '200A Electrical Panel Upgrades', desc: 'Upgrading obsolete 60A or 100A fuse/breaker panels to 200 Amps for modern appliances & EV chargers with full ESA inspection.' },
      { name: 'Level 2 EV Charger Installation', desc: 'Dedicated 240V lines (40A/50A/60A) for Tesla Wall Connectors, ChargePoint, JuiceBox, Wallbox, and all EV models.' },
      { name: 'Lighting Design & Potlights', desc: 'Recessed interior LED potlights, ambient soffit lighting, chandeliers, 0-10V dimmers, and outdoor landscape lighting.' },
      { name: 'Renovations & Home Additions', desc: 'Complete electrical rewiring for kitchen remodels, basement apartments, coffee bars, garage suites, and extensions.' },
      { name: 'Troubleshooting & Emergency Repairs', desc: 'Diagnostic & repair for burning smells, flickering lights, tripping breakers, dead GFCI outlets, and short circuits.' },
      { name: 'Surge Protection & ESA Safety Inspections', desc: 'Whole-home surge protector installation, AFCI/GFCI retrofits, infrared thermal scans, and ESA certificates.' }
    ],

    commercial: [
      { name: 'New Construction & Buildouts', desc: 'Commercial electrical design, main distribution panels, three-phase power wiring, and subpanel distribution.' },
      { name: 'Tenant Improvements', desc: 'Office remodels, retail store retrofits, restaurant equipment hookups, server room UPS feeds, and dedicated circuits.' },
      { name: 'Three-Phase Service & Transformers', desc: '120/208V & 347/600V power upgrades, high-voltage transformers, disconnect switches, and subpanels.' },
      { name: 'High-Bay & Perimeter LED Lighting', desc: 'Warehouse high-bay LED luminaires, perimeter security lighting, automated daylight harvesting, and motion control panels.' },
      { name: 'Code Compliance & ESA Audits', desc: 'ESA defect corrections, fire alarm system wiring, emergency generator backup, and safety compliance audits.' }
    ]
  },

  projects: [
    { title: '200A Panel Upgrade & Rewire', location: 'Mississauga, ON', desc: '200 Amp breaker panel replacement, whole-home surge protector, passed ESA inspection.' },
    { title: 'Dual Tesla Level 2 EV Charger', location: 'Oakville, ON', desc: '48A wall connector with EMT metal conduit and dedicated 60A breaker.' },
    { title: 'Commercial Office Architectural LED Lighting', location: 'Toronto, ON', desc: 'Suspended linear LED luminaires, 0-10V dimming, daylight harvesting.' },
    { title: 'Luxury Soffit & Accent Lighting', location: 'Brampton, ON', desc: '3000K warm white LED soffit pot lights with astronomical smart timer.' },
    { title: 'Commercial Tenant Buildout', location: 'Vaughan, ON', desc: 'Three-phase 120/208V power distribution, server UPS feeds, fire alarm integration.' },
    { title: 'Whole-Home Safety Audit & Troubleshooting', location: 'Milton, ON', desc: 'Infrared thermal scan, arc-fault (AFCI) breakers, ECRA/ESA compliance report.' }
  ],

  reviews: [
    { author: 'Steve M.', text: 'A-Wire helped us with a faulty breaker and installed a light fixture. Very quick and professional. Highly recommended.' },
    { author: 'Ingrid G.', text: 'Ashan converted my fluorescent lighting to energy efficient LED lighting at a reasonable price. Highly recommend!' },
    { author: 'Sahan T.', text: 'Wired our new kitchen island, coffee bar, and walk-in closet potlights. Precise, clean, minimal mess.' },
    { author: 'Dave D.', text: 'Replaced old GFI receptacle and put in dusk-to-dawn timer for outdoor lights + under counter LED strip lights.' }
  ],

  pages: {
    home: '/index.html',
    services: '/services.html',
    gallery: '/gallery.html',
    quote: '/quote.html',
    contact: '/contact.html'
  }
};

function initChatbot() {
  if (!document.getElementById('chatbot-widget-container')) {
    const chatbotHtml = `
      <div id="chatbot-widget-container">
        <button type="button" class="chatbot-toggle-btn" id="chatbot-toggle" aria-label="Open AI Assistant Chat">
          <span class="chatbot-badge-dot"></span>
          <span>⚡ Ask A-Wire AI</span>
        </button>

        <div class="chatbot-widget-panel" id="chatbot-panel" aria-hidden="true">
          <div class="chat-panel-header">
            <div class="chat-header-info">
              <div class="chat-avatar-wrap">⚡</div>
              <div class="chat-title-group">
                <h4>A-Wire Site Assistant</h4>
                <span class="chat-status-pill">
                  <span class="chat-status-dot"></span> Online • Site-Wide Knowledge
                </span>
              </div>
            </div>
            <button type="button" class="chat-close-btn" id="chat-close" aria-label="Close Chat">&times;</button>
          </div>

          <div class="chat-messages-container" id="chat-messages">
            <div class="chat-msg chat-msg-bot">
              <div class="msg-bubble">
                👋 Hello! I am the A-Wire AI Assistant. I can answer <strong>any question</strong> about our electrical services, pricing, projects, ESA licensing (#7016330), or emergency dispatch!
              </div>
              <span class="msg-time">Just now</span>
            </div>
          </div>

          <div class="chat-suggestions-strip">
            <button type="button" class="chip-btn" data-query="200A Panel Upgrade cost">💡 200A Panel Upgrade</button>
            <button type="button" class="chip-btn" data-query="Tesla EV Charger installation">🔌 EV Charger Setup</button>
            <button type="button" class="chip-btn" data-query="24/7 Emergency phone">🚨 Emergency Service</button>
            <button type="button" class="chip-btn" data-query="What areas do you serve?">📍 Service Areas</button>
            <button type="button" class="chip-btn" data-query="How do I get a free quote?">📋 Get Free Quote</button>
          </div>

          <form class="chat-input-area" id="chat-form">
            <input type="text" id="chat-input" class="chat-input-field" placeholder="Ask any question about A-Wire services, licensing, projects..." autocomplete="off" required>
            <button type="submit" class="chat-send-btn" aria-label="Send Message">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHtml);
  }

  const toggleBtn = document.getElementById('chatbot-toggle');
  const closeBtn = document.getElementById('chat-close');
  const panel = document.getElementById('chatbot-panel');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const messagesContainer = document.getElementById('chat-messages');
  const chipBtns = document.querySelectorAll('.chip-btn');

  if (!toggleBtn || !panel) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    panel.setAttribute('aria-hidden', !isOpen);
    if (isOpen && chatInput) chatInput.focus();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
    });
  }

  chipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-query');
      if (query) handleUserQuery(query);
    });
  });

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = '';
      handleUserQuery(text);
    });
  }

  function handleUserQuery(userText) {
    appendMessage(userText, 'user');
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const botResponse = queryComprehensiveKnowledgeEngine(userText);
      appendMessage(botResponse, 'bot');
    }, 400 + Math.random() * 400);
  }

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg chat-msg-${sender}`;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msgDiv.innerHTML = `
      <div class="msg-bubble">${text}</div>
      <span class="msg-time">${timeStr}</span>
    `;

    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'chat-typing-indicator';
    typingDiv.className = 'chat-msg chat-msg-bot';
    typingDiv.innerHTML = `
      <div class="msg-bubble" style="padding: 0.6rem 1rem;">
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function removeTypingIndicator() {
    const typingEl = document.getElementById('chat-typing-indicator');
    if (typingEl) typingEl.remove();
  }

  // Comprehensive Multi-Intent Search AI Algorithm
  function queryComprehensiveKnowledgeEngine(userQuery) {
    const q = userQuery.toLowerCase().trim();

    // 1. Emergency & Outage Intent
    if (q.includes('emergenc') || q.includes('outage') || q.includes('power out') || q.includes('smoke') || q.includes('burning') || q.includes('spark') || q.includes('trip') || q.includes('24/7') || q.includes('night') || q.includes('urgent')) {
      return `🚨 <strong>24/7 EMERGENCY DISPATCH AVAILABLE</strong><br><br>A-Wire provides 24-hour emergency response for power outages, burning smells, tripping breakers, or sparking outlets.<br><br>👉 <strong>Immediate Dispatch Call: <a href="tel:9059555455" style="color:var(--primary-gold); font-weight:bold;">905 955-5455</a></strong>`;
    }

    // 2. Panel Upgrades & Breakers Intent
    if (q.includes('panel') || q.includes('200a') || q.includes('200 amp') || q.includes('100a') || q.includes('breaker') || q.includes('fuse') || q.includes('subpanel') || q.includes('service upgrade')) {
      return `💡 <strong>200A Electrical Panel Upgrades</strong><br><br>We replace obsolete 60A/100A fuse & breaker panels with heavy-duty 200-Amp main breaker panels, whole-home surge protection, and full ESA inspection.<br><br>👉 <a href="/quote.html" style="color:var(--primary-gold); font-weight:bold;">Calculate Panel Quote &gt;</a> | <a href="/services.html" style="color:var(--primary-gold);">View Panel Services &gt;</a>`;
    }

    // 3. EV Charger & Tesla Intent
    if (q.includes('ev') || q.includes('charger') || q.includes('tesla') || q.includes('level 2') || q.includes('chargepoint') || q.includes('car') || q.includes('electric vehicle')) {
      return `🔌 <strong>Level 2 EV Charger Installation</strong><br><br>We install dedicated 240V circuits (40A/50A/60A breakers with EMT conduit) for Tesla Wall Connectors, ChargePoint, JuiceBox, Wallbox, and all EV models in double/single garages.<br><br>👉 <a href="/quote.html" style="color:var(--primary-gold); font-weight:bold;">Get EV Charger Estimate &gt;</a>`;
    }

    // 4. Potlights & Lighting Design Intent
    if (q.includes('light') || q.includes('potlight') || q.includes('recessed') || q.includes('soffit') || q.includes('led') || q.includes('chandelier') || q.includes('fixture') || q.includes('dimmer')) {
      return `💡 <strong>Interior & Exterior Lighting Solutions</strong><br><br>We design and install interior LED recessed potlights, 3000K warm soffit accent lighting with smart timers, chandeliers, 0-10V commercial dimming, and garden uplighting.<br><br>👉 <a href="/gallery.html" style="color:var(--primary-gold); font-weight:bold;">View Lighting Photo Gallery &gt;</a>`;
    }

    // 5. Commercial Electrical Intent
    if (q.includes('commercial') || q.includes('office') || q.includes('retail') || q.includes('warehouse') || q.includes('three phase') || q.includes('3 phase') || q.includes('transformer') || q.includes('ups') || q.includes('high bay')) {
      return `🏢 <strong>Commercial Electrical Contracting</strong><br><br>We handle commercial new construction, tenant improvements, three-phase 120/208V & 347/600V service upgrades, high-bay warehouse LED lighting, server room UPS feeds, and ESA audits.<br><br>👉 <a href="/services.html" style="color:var(--primary-gold); font-weight:bold;">View Commercial Services &gt;</a>`;
    }

    // 6. Pricing, Cost, Quote & Fee Intent
    if (q.includes('price') || q.includes('cost') || q.includes('quote') || q.includes('estimate') || q.includes('rate') || q.includes('fee') || q.includes('how much')) {
      return `📋 <strong>Transparent Upfront Pricing</strong><br><br>We provide transparent upfront pricing that respects your time and budget with zero hidden fees before starting any job. You can use our interactive Quote Calculator online!<br><br>👉 <a href="/quote.html" style="color:var(--primary-gold); font-weight:bold;">Request a Free Quote Online &gt;</a>`;
    }

    // 7. Licensing, ESA Number & Safety Intent
    if (q.includes('license') || q.includes('licence') || q.includes('esa') || q.includes('ecra') || q.includes('insur') || q.includes('certified') || q.includes('permits')) {
      return `🛡️ <strong>ECRA / ESA Certified #7016330</strong><br><br>A-Wire Electrical Contracting Inc. is fully licensed by the Electrical Safety Authority and carries full commercial liability insurance. All work is performed by certified master electricians and includes official ESA certificates.`;
    }

    // 8. Service Areas & Location Intent
    if (q.includes('area') || q.includes('location') || q.includes('city') || q.includes('mississauga') || q.includes('oakville') || q.includes('brampton') || q.includes('milton') || q.includes('vaughan') || q.includes('toronto') || q.includes('gta')) {
      return `📍 <strong>Service Areas Covered</strong><br><br>We serve the entire Greater Toronto Area (GTA), including:<br>• Mississauga<br>• Oakville<br>• Brampton<br>• Milton<br>• Vaughan & Etobicoke<br>• Toronto`;
    }

    // 9. Hours & Phone / Email Intent
    if (q.includes('hour') || q.includes('phone') || q.includes('number') || q.includes('contact') || q.includes('email') || q.includes('open') || q.includes('weekend') || q.includes('sunday')) {
      return `📞 <strong>Contact & Operating Hours</strong><br><br>• Emergency Dispatch: <strong>24 Hours / 7 Days a Week</strong><br>• Standard Hours: Mon – Sat: 7:00 AM – 7:00 PM<br>• Phone: <strong><a href="tel:9059555455" style="color:var(--primary-gold);">905 955-5455</a></strong><br>• Email: <strong>awire.ec@gmail.com</strong>`;
    }

    // 10. Reviews & Customer Feedback Intent
    if (q.includes('review') || q.includes('rating') || q.includes('feedback') || q.includes('testimonial') || q.includes('reputation') || q.includes('google')) {
      return `⭐ <strong>5.0 Star Verified Google Reviews</strong><br><br>Our clients praise our master electricians for fast diagnostics, clean potlight installs, and transparent pricing!<br><br>• Steve M.: <em>"Quick and professional. Highly recommended."</em><br>• Ingrid G.: <em>"Efficient LED lighting conversion at a great price."</em><br>• Sahan T.: <em>"Kitchen island & closet potlights done with minimal mess."</em><br><br>👉 <a href="/index.html#reviews" style="color:var(--primary-gold); font-weight:bold;">Read All Google Reviews &gt;</a>`;
    }

    // 11. Project Photo Gallery Intent
    if (q.includes('gallery') || q.includes('photo') || q.includes('picture') || q.includes('example') || q.includes('project') || q.includes('portfolio')) {
      return `📷 <strong>Electrical Project Gallery</strong><br><br>View photos of our panel upgrades, dual Tesla EV chargers, commercial office linear LEDs, and soffit lighting.<br><br>👉 <a href="/gallery.html" style="color:var(--primary-gold); font-weight:bold;">Explore Photo Gallery &gt;</a>`;
    }

    // 12. Renovations, Kitchens, Basements & Outlets Intent
    if (q.includes('renov') || q.includes('kitchen') || q.includes('basement') || q.includes('outlet') || q.includes('switch') || q.includes('gfi') || q.includes('gfci') || q.includes('rewir')) {
      return `🏠 <strong>Home Renovations & Outlet Relocation</strong><br><br>We specialize in kitchen island outlet wiring, coffee bar circuits, basement suite power, GFCI safety replacements, and full home rewiring.<br><br>👉 <a href="/quote.html" style="color:var(--primary-gold); font-weight:bold;">Request Renovation Quote &gt;</a>`;
    }

    // Intelligent Smart Synthesis Fallback
    return `⚡ <strong>A-Wire Electrical Assistant</strong><br><br>I can help answer questions regarding our residential & commercial electrical services, 200A panel upgrades, EV chargers, ESA Licence #7016330, or service areas.<br><br>• 📞 Call 24/7: <strong><a href="tel:9059555455" style="color:var(--primary-gold);">905 955-5455</a></strong><br>• 📋 <a href="/quote.html" style="color:var(--primary-gold); font-weight:bold;">Get a Free Quote Online &gt;</a><br>• 🛠️ <a href="/services.html" style="color:var(--primary-gold);">Explore All Services &gt;</a>`;
  }
}
