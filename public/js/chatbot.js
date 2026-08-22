// Static AI Electrical Assistant Chatbot JavaScript for A-Wire Electrical Contracting Inc.

document.addEventListener('DOMContentLoaded', () => {
  initChatbot();
});

function initChatbot() {
  // Inject Chatbot HTML Widget if not present
  if (!document.getElementById('chatbot-widget-container')) {
    const chatbotHtml = `
      <div id="chatbot-widget-container">
        <!-- Floating Toggle Button -->
        <button type="button" class="chatbot-toggle-btn" id="chatbot-toggle" aria-label="Open AI Assistant Chat">
          <span class="chatbot-badge-dot"></span>
          <span>⚡ Ask A-Wire AI</span>
        </button>

        <!-- Floating Chat Widget Panel -->
        <div class="chatbot-widget-panel" id="chatbot-panel" aria-hidden="true">
          <!-- Header -->
          <div class="chat-panel-header">
            <div class="chat-header-info">
              <div class="chat-avatar-wrap">⚡</div>
              <div class="chat-title-group">
                <h4>A-Wire Electrical AI</h4>
                <span class="chat-status-pill">
                  <span class="chat-status-dot"></span> Online 24/7 Master Assistant
                </span>
              </div>
            </div>
            <button type="button" class="chat-close-btn" id="chat-close" aria-label="Close Chat">&times;</button>
          </div>

          <!-- Messages Container -->
          <div class="chat-messages-container" id="chat-messages">
            <div class="chat-msg chat-msg-bot">
              <div class="msg-bubble">
                👋 Hello! I'm the A-Wire Electrical AI Assistant. How can I help you today?
              </div>
              <span class="msg-time">Just now</span>
            </div>
            <div class="chat-msg chat-msg-bot">
              <div class="msg-bubble">
                You can ask me about our <strong>24/7 Emergency Dispatch</strong>, <strong>200A Panel Upgrades</strong>, <strong>Tesla EV Charger Installs</strong>, <strong>ESA Licensing (#7016330)</strong>, or request a free quote!
              </div>
              <span class="msg-time">Just now</span>
            </div>
          </div>

          <!-- Quick Action Chips -->
          <div class="chat-suggestions-strip">
            <button type="button" class="chip-btn" data-query="Emergency Service">🚨 24/7 Emergency</button>
            <button type="button" class="chip-btn" data-query="200A Panel Upgrade">💡 Panel Upgrade</button>
            <button type="button" class="chip-btn" data-query="EV Charger Installation">🔌 EV Charger</button>
            <button type="button" class="chip-btn" data-query="Request a Free Quote">📋 Request Quote</button>
            <button type="button" class="chip-btn" data-query="Phone Number">📞 Call 905 955-5455</button>
          </div>

          <!-- Input Area -->
          <form class="chat-input-area" id="chat-form">
            <input type="text" id="chat-input" class="chat-input-field" placeholder="Ask about electrical services, pricing, emergency..." autocomplete="off" required>
            <button type="submit" class="chat-send-btn" aria-label="Send Message">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHtml);
  }

  // DOM Elements
  const toggleBtn = document.getElementById('chatbot-toggle');
  const closeBtn = document.getElementById('chat-close');
  const panel = document.getElementById('chatbot-panel');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const messagesContainer = document.getElementById('chat-messages');
  const chipBtns = document.querySelectorAll('.chip-btn');

  if (!toggleBtn || !panel) return;

  // Toggle Chat Open/Close
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

  // Quick Action Chips
  chipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-query');
      if (query) {
        handleUserQuery(query);
      }
    });
  });

  // Submit Form
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
      const botResponse = generateAIResponse(userText);
      appendMessage(botResponse, 'bot');
    }, 700 + Math.random() * 500);
  }

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg chat-msg-${sender}`;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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

  // Client-Side AI Knowledge Matching Engine
  function generateAIResponse(query) {
    const q = query.toLowerCase();

    // 1. Emergency / Outage / 24/7
    if (q.includes('emergenc') || q.includes('outage') || q.includes('power out') || q.includes('smoke') || q.includes('burning') || q.includes('sparks') || q.includes('urgent') || q.includes('24/7')) {
      return `🚨 <strong>24/7 EMERGENCY DISPATCH AVAILABLE</strong><br><br>If you smell burning, see sparks, or have a critical electrical outage, our certified master electricians are available 24/7 across GTA.<br><br>👉 <strong>Call Dispatch Directly: <a href="tel:9059555455" style="color:var(--primary-gold); font-weight:bold;">905 955-5455</a></strong>`;
    }

    // 2. Panel Upgrade / Breaker / 200A
    if (q.includes('panel') || q.includes('200a') || q.includes('200 amp') || q.includes('breaker') || q.includes('fuse') || q.includes('subpanel')) {
      return `⚡ <strong>200A Electrical Panel Upgrades</strong><br><br>We replace old 60A/100A fuse & breaker panels with heavy-duty 200-Amp main breaker panels, whole-home surge protection, and full ESA inspection.<br><br>👉 <a href="/quote.html" style="color:var(--primary-gold); font-weight:bold;">Request a Free Panel Upgrade Quote &gt;</a>`;
    }

    // 3. EV Charger / Tesla / Level 2
    if (q.includes('ev') || q.includes('charger') || q.includes('tesla') || q.includes('car') || q.includes('vehicle') || q.includes('charging')) {
      return `🔌 <strong>Level 2 EV Charger Installation</strong><br><br>We install dedicated 240V lines (40A/50A/60A breakers) for Tesla Wall Connectors, ChargePoint, JuiceBox, and all electric vehicles.<br><br>👉 <a href="/quote.html" style="color:var(--primary-gold); font-weight:bold;">Get EV Charger Estimate &gt;</a>`;
    }

    // 4. Lighting / Potlights / Soffit
    if (q.includes('light') || q.includes('potlight') || q.includes('recessed') || q.includes('soffit') || q.includes('led') || q.includes('fixture')) {
      return `💡 <strong>Interior & Exterior Lighting Design</strong><br><br>From dimmable LED recessed potlights to exterior architectural soffit lighting and commercial office fixtures, we design and install custom lighting.<br><br>👉 <a href="/gallery.html" style="color:var(--primary-gold); font-weight:bold;">View Our Lighting Gallery &gt;</a>`;
    }

    // 5. Price / Cost / Quote / Estimate
    if (q.includes('price') || q.includes('cost') || q.includes('quote') || q.includes('estimate') || q.includes('rate') || q.includes('fee')) {
      return `📋 <strong>Transparent Upfront Pricing</strong><br><br>We provide flat-rate, transparent estimates with zero hidden fees before starting any job. Residential & Commercial.<br><br>👉 <a href="/quote.html" style="color:var(--primary-gold); font-weight:bold;">Calculate Your Custom Quote &gt;</a>`;
    }

    // 6. ESA License / Insurance / Master Electrician
    if (q.includes('license') || q.includes('licence') || q.includes('esa') || q.includes('ecra') || q.includes('insur') || q.includes('certified')) {
      return `🛡️ <strong>ECRA / ESA Certified #7016330</strong><br><br>A-Wire Electrical Contracting Inc. is fully licensed by the Electrical Safety Authority and carries full commercial liability insurance. All work is 100% code compliant.`;
    }

    // 7. Phone / Contact / Email / Location
    if (q.includes('phone') || q.includes('number') || q.includes('contact') || q.includes('email') || q.includes('location') || q.includes('area') || q.includes('address')) {
      return `📞 <strong>Contact Details & Service Area</strong><br><br>• Phone: <strong>905 955-5455</strong><br>• Email: <strong>awire.ec@gmail.com</strong><br>• Areas: Mississauga, Oakville, Brampton, Milton, Vaughan & Greater Toronto Area.`;
    }

    // Default Fallback
    return `⚡ Thank you for reaching out to A-Wire Electrical! How can we best assist your project today?<br><br>• Call us 24/7 at <strong><a href="tel:9059555455" style="color:var(--primary-gold);">905 955-5455</a></strong><br>• Or <a href="/quote.html" style="color:var(--primary-gold); font-weight:bold;">Request a Free Quote Online &gt;</a>`;
  }
}
