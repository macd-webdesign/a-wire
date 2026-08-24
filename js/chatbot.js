// A-Wire Site-Wide Knowledge Index & Conversational AI Chatbot Widget

const chatbotKnowledge = {
  company: 'A-Wire Electrical Contracting Inc.',
  license: 'ECRA/ESA# 7016330',
  phone: '905 955-5455',
  email: 'awire.ec@gmail.com',
  tagline: 'POWERING YOUR HOME. ENERGIZING YOUR BUSINESS.',
  serviceAreas: ['Mississauga', 'Oakville', 'Brampton', 'Milton', 'Vaughan', 'Etobicoke', 'Toronto', 'GTA'],
  hours: {
    emergency: '24 Hours / 7 Days a Week',
    standard: 'Monday to Saturday: 7:00 AM - 7:00 PM'
  },
  pricingPolicy: 'Upfront pricing that respects your time and budget with zero hidden fees.',
  
  services: {
    residential: [
      { name: '200A Electrical Panel Upgrades', desc: 'Upgrading obsolete 60A or 100A fuse/breaker panels to 200 Amps for modern appliances & EV chargers with full ESA inspection.' },
      { name: 'Emergency Backup Generators & Generlink', desc: 'Authorized Generlink installer for meter collar generator transfer switches and home emergency backup power connection.' },
      { name: 'Level 2 EV Charger Installation', desc: 'Dedicated 240V lines (40A/50A/60A) for Tesla Wall Connectors, ChargePoint, JuiceBox, Wallbox, and all EV models.' },
      { name: 'Lighting Design & Potlights', desc: 'Recessed interior LED potlights, ambient soffit lighting, chandeliers, 0-10V dimmers, and outdoor landscape lighting.' },
      { name: 'Renovations & Home Additions', desc: 'Complete electrical rewiring for kitchen remodels, basement apartments, coffee bars, garage suites, and extensions.' },
      { name: 'Troubleshooting & Emergency Repairs', desc: 'Diagnostic & repair for burning smells, flickering lights, tripping breakers, dead GFCI outlets, and short circuits.' },
      { name: 'Surge Protection & ESA Safety Inspections', desc: 'Whole-home surge protector installation, AFCI/GFCI retrofits, infrared thermal scans, and ESA certificates.' }
    ],

    commercial: [
      { name: 'Emergency Power & Backup Generators', desc: 'Authorized Generlink installer, commercial emergency power distribution, manual & automatic transfer switches, and standby generator hookups.' },
      { name: 'New Construction & Buildouts', desc: 'Commercial electrical design, main distribution panels, three-phase power wiring, and subpanel distribution.' },
      { name: 'Tenant Improvements', desc: 'Office remodels, retail store retrofits, restaurant equipment hookups, server room UPS feeds, and dedicated circuits.' },
      { name: 'Three-Phase Service & Transformers', desc: '120/208V & 347/600V power upgrades, high-voltage transformers, disconnect switches, and subpanels.' },
      { name: 'High-Bay & Perimeter LED Lighting', desc: 'Warehouse high-bay LED luminaires, perimeter security lighting, automated daylight harvesting, and motion control panels.' },
      { name: 'Code Compliance & ESA Audits', desc: 'ESA defect corrections, fire alarm system wiring, emergency generator backup, and safety compliance audits.' }
    ]
  },

  projects: [
    { title: 'Agricultural Arc Fault Protection Installation', desc: 'Agricultural arc fault protection installation in an equestrian facility as an insurance requirement with ESA certificate.' },
    { title: 'Generlink & Emergency Backup Power', desc: 'Authorized Generlink installation on exterior meter base collar for seamless emergency generator power transfer.' },
    { title: '200A Panel Upgrade & Rewire', desc: '200 Amp breaker panel replacement, whole-home surge protector, passed ESA inspection.' },
    { title: 'Dual Tesla Level 2 EV Charger', desc: '48A wall connector with EMT metal conduit and dedicated 60A breaker.' },
    { title: 'Commercial Office Architectural LED Lighting', desc: 'Suspended linear LED luminaires, 0-10V dimming, daylight harvesting.' },
    { title: 'Luxury Soffit & Accent Lighting', desc: '3000K warm white LED soffit pot lights with astronomical smart timer.' }
  ],

  reviews: [
    { author: 'Steve M.', text: 'A-Wire helped us with a faulty breaker and installed a light fixture. Very quick and professional. Highly recommended.' },
    { author: 'Ingrid G.', text: 'Ashan converted my fluorescent lighting to energy efficient LED lighting at a reasonable price. Highly recommend!' },
    { author: 'Sahan T.', text: 'Wired our new kitchen island, coffee bar, and walk-in closet potlights. Precise, clean, minimal mess.' },
    { author: 'Dave D.', text: 'Replaced old GFI receptacle and put in dusk-to-dawn timer for outdoor lights + under counter LED strip lights.' }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  initChatbotUI();
});

function initChatbotUI() {
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'awire-chatbot-widget';
  widgetContainer.className = 'chatbot-widget-wrapper';

  widgetContainer.innerHTML = `
    <!-- Floating Action Button -->
    <button type="button" id="chatbot-toggle-btn" class="chatbot-toggle-btn" aria-label="Open A-Wire Assistant Chat">
      <span>⚡ AI Assistant</span>
      <span class="chatbot-badge-dot"></span>
    </button>

    <!-- Chat Modal Window Panel -->
    <div id="chatbot-widget-panel" class="chatbot-widget-panel">
      <div class="chat-panel-header">
        <div class="chat-header-info">
          <div class="chat-avatar-wrap">⚡</div>
          <div class="chat-title-group">
            <h4>A-Wire Assistant</h4>
            <span class="chat-status-pill"><span class="chat-status-dot"></span> Online • ECRA/ESA# 7016330</span>
          </div>
        </div>
        <button type="button" id="chat-close-btn" class="chat-close-btn" aria-label="Close Chat">&times;</button>
      </div>

      <div id="chat-messages-container" class="chat-messages-container">
        <div class="chat-msg chat-msg-bot">
          <div class="msg-bubble">
            👋 Hello! Welcome to <strong>A-Wire Electrical Contracting</strong>.<br><br>How can I help you today? Ask me about our <strong>panel upgrades, EV chargers, emergency power generators & Generlink, potlights, or commercial wiring</strong>!
          </div>
        </div>
      </div>

      <div class="chat-suggestions-strip">
        <button type="button" class="chip-btn" data-query="emergency power generators">Generators & Generlink</button>
        <button type="button" class="chip-btn" data-query="commercial services">Commercial Services</button>
        <button type="button" class="chip-btn" data-query="panel upgrade cost">Panel Upgrade</button>
        <button type="button" class="chip-btn" data-query="EV charger install">EV Charger</button>
      </div>

      <form id="chat-input-form" class="chat-input-area">
        <input type="text" id="chat-input-field" class="chat-input-field" placeholder="Ask a question about our services..." autocomplete="off" required>
        <button type="submit" class="btn btn-primary" aria-label="Send Message" style="padding: 0.6rem 1rem;">
          <span>Send</span>
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(widgetContainer);

  const toggleBtn = document.getElementById('chatbot-toggle-btn');
  const closeBtn = document.getElementById('chat-close-btn');
  const widgetPanel = document.getElementById('chatbot-widget-panel');
  const chatForm = document.getElementById('chat-input-form');
  const chatInput = document.getElementById('chat-input-field');
  const messagesContainer = document.getElementById('chat-messages-container');

  toggleBtn.addEventListener('click', () => {
    widgetPanel.classList.toggle('open');
    if (widgetPanel.classList.contains('open')) {
      chatInput.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    widgetPanel.classList.remove('open');
  });

  document.querySelectorAll('.chip-btn').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const query = e.target.getAttribute('data-query');
      handleUserQuery(query);
    });
  });

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;
    handleUserQuery(query);
    chatInput.value = '';
  });

  function handleUserQuery(queryText) {
    appendMessage(queryText, 'user');

    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const botResponse = queryComprehensiveKnowledgeEngine(queryText);
      appendMessage(botResponse, 'bot');
    }, 400);
  }

  function appendMessage(content, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender === 'user' ? 'chat-msg-user' : 'chat-msg-bot'}`;
    msgDiv.innerHTML = `<div class="msg-bubble">${content}</div>`;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'chatbot-typing';
    typingDiv.className = 'chat-msg chat-msg-bot';
    typingDiv.innerHTML = `<div class="msg-bubble">Typing...</div>`;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function removeTypingIndicator() {
    const typingEl = document.getElementById('chatbot-typing');
    if (typingEl) typingEl.remove();
  }

  // Comprehensive Multi-Intent Search AI Algorithm
  function queryComprehensiveKnowledgeEngine(userQuery) {
    const q = userQuery.toLowerCase().trim();

    // 1. Emergency Power & Backup Generators / Generlink Intent
    if (q.includes('generat') || q.includes('generlink') || q.includes('emergency power') || q.includes('backup power') || q.includes('standby power')) {
      return `⚡ <strong>Emergency Power & Backup Generators (Authorized Generlink Installer)</strong><br><br>We provide professional commercial & residential emergency power systems, Authorized Generlink meter collar transfer switches, and standby generator hookups for seamless backup power during outages.<br><br>👉 <a href="services.html" style="color:var(--primary-gold); font-weight:bold;">View Emergency Power Services &gt;</a> | <a href="quote.html" style="color:var(--primary-gold);">Request Generator Quote &gt;</a>`;
    }

    // 2. Emergency & Outage Intent
    if (q.includes('emergenc') || q.includes('outage') || q.includes('power out') || q.includes('smoke') || q.includes('burning') || q.includes('spark') || q.includes('trip') || q.includes('24/7') || q.includes('night') || q.includes('urgent')) {
      return `🚨 <strong>24/7 EMERGENCY DISPATCH AVAILABLE</strong><br><br>A-Wire provides 24-hour emergency response for power outages, burning smells, tripping breakers, or sparking outlets.<br><br>👉 <strong>Immediate Dispatch Call: <a href="tel:9059555455" style="color:var(--primary-gold); font-weight:bold;">905 955-5455</a></strong>`;
    }

    // 3. Panel Upgrades & Breakers Intent
    if (q.includes('panel') || q.includes('200a') || q.includes('200 amp') || q.includes('100a') || q.includes('breaker') || q.includes('fuse') || q.includes('subpanel') || q.includes('service upgrade')) {
      return `💡 <strong>200A Electrical Panel Upgrades</strong><br><br>We replace obsolete 60A/100A fuse & breaker panels with heavy-duty 200-Amp main breaker panels, whole-home surge protection, and full ESA inspection.<br><br>👉 <a href="quote.html" style="color:var(--primary-gold); font-weight:bold;">Calculate Panel Quote &gt;</a> | <a href="services.html" style="color:var(--primary-gold);">View Panel Services &gt;</a>`;
    }

    // 4. EV Charger & Tesla Intent
    if (q.includes('ev') || q.includes('charger') || q.includes('tesla') || q.includes('level 2') || q.includes('chargepoint') || q.includes('car') || q.includes('electric vehicle')) {
      return `🔌 <strong>Level 2 EV Charger Installation</strong><br><br>We install dedicated 240V circuits (40A/50A/60A breakers with EMT conduit) for Tesla Wall Connectors, ChargePoint, JuiceBox, Wallbox, and all EV models in double/single garages.<br><br>👉 <a href="quote.html" style="color:var(--primary-gold); font-weight:bold;">Get EV Charger Estimate &gt;</a>`;
    }

    // 5. Potlights & Lighting Design Intent
    if (q.includes('light') || q.includes('potlight') || q.includes('recessed') || q.includes('soffit') || q.includes('led') || q.includes('chandelier') || q.includes('fixture') || q.includes('dimmer')) {
      return `💡 <strong>Interior & Exterior Lighting Solutions</strong><br><br>We design and install interior LED recessed potlights, 3000K warm soffit accent lighting with smart timers, chandeliers, 0-10V commercial dimming, and garden uplighting.<br><br>👉 <a href="gallery.html" style="color:var(--primary-gold); font-weight:bold;">View Lighting Photo Gallery &gt;</a>`;
    }

    // 6. Commercial Electrical Intent
    if (q.includes('commercial') || q.includes('office') || q.includes('retail') || q.includes('warehouse') || q.includes('three phase') || q.includes('3 phase') || q.includes('transformer') || q.includes('ups') || q.includes('high bay')) {
      return `🏢 <strong>Commercial Electrical Contracting</strong><br><br>We handle commercial emergency power & generators, Authorized Generlink installations, new construction buildouts, three-phase power upgrades, high-bay LED lighting, and ESA audits.<br><br>👉 <a href="services.html" style="color:var(--primary-gold); font-weight:bold;">View Commercial Services &gt;</a>`;
    }

    // 7. Pricing, Cost, Quote & Fee Intent
    if (q.includes('price') || q.includes('cost') || q.includes('quote') || q.includes('estimate') || q.includes('rate') || q.includes('fee') || q.includes('how much')) {
      return `📋 <strong>Transparent Upfront Pricing</strong><br><br>We provide transparent upfront pricing that respects your time and budget with zero hidden fees before starting any job. You can use our interactive Quote Calculator online!<br><br>👉 <a href="quote.html" style="color:var(--primary-gold); font-weight:bold;">Request a Free Quote Online &gt;</a>`;
    }

    // 8. Licensing, ESA Number & Safety Intent
    if (q.includes('license') || q.includes('licence') || q.includes('esa') || q.includes('ecra') || q.includes('insur') || q.includes('certified') || q.includes('permits')) {
      return `🛡️ <strong>ECRA / ESA Certified #7016330</strong><br><br>A-Wire Electrical Contracting Inc. is fully licensed by the Electrical Safety Authority and carries full commercial liability insurance. All work is performed by certified master electricians and includes official ESA certificates.`;
    }

    // 9. Service Areas & Location Intent
    if (q.includes('area') || q.includes('location') || q.includes('city') || q.includes('mississauga') || q.includes('oakville') || q.includes('brampton') || q.includes('milton') || q.includes('vaughan') || q.includes('toronto') || q.includes('gta')) {
      return `📍 <strong>Service Areas Covered</strong><br><br>We serve the entire Greater Toronto Area (GTA), including:<br>• Mississauga<br>• Oakville<br>• Brampton<br>• Milton<br>• Vaughan & Etobicoke<br>• Toronto`;
    }

    // 10. Hours & Phone / Email Intent
    if (q.includes('hour') || q.includes('phone') || q.includes('number') || q.includes('contact') || q.includes('email') || q.includes('open') || q.includes('weekend') || q.includes('sunday')) {
      return `📞 <strong>Contact & Operating Hours</strong><br><br>• Emergency Dispatch: <strong>24 Hours / 7 Days a Week</strong><br>• Standard Hours: Mon – Sat: 7:00 AM – 7:00 PM<br>• Phone: <strong><a href="tel:9059555455" style="color:var(--primary-gold);">905 955-5455</a></strong><br>• Email: <strong>awire.ec@gmail.com</strong>`;
    }

    // Fallback General Response
    return `⚡ <strong>A-Wire Electrical Contracting Inc.</strong><br><br>We specialize in 200A panel upgrades, emergency power & backup generators (Authorized Generlink installer), Level 2 EV chargers, potlights, and commercial buildouts.<br><br>How can we assist you today?<br>• Phone: <strong><a href="tel:9059555455" style="color:var(--primary-gold);">905 955-5455</a></strong><br>• <a href="quote.html" style="color:var(--primary-gold);">Request a Free Quote Online &gt;</a>`;
  }
}
