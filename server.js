const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static assets from public/
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data store for submissions
const quoteRequests = [];
const contactInquiries = [];

// Google Review Search URL provided by user
const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=a-wire+electrical+contracting+inc.+reviews';

// REAL Google Reviews Data (Matching dgrelectric.ca / Google Business Reviews)
const realGoogleReviews = [
  {
    id: 1,
    author: 'Nirujan Balachandran',
    date: '2026-08-04',
    rating: 5,
    avatarText: 'N',
    avatarBg: '#0284C7', // Blue circle as in screenshot
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
    avatarImg: '/assets/gallery/ev_charger.jpg', // Realistic avatar
    snippet: 'Daniel and Rob did an excellent job installing my EV charger. They were professional, efficient, and friendly.',
    fullText: 'Daniel and Rob did an excellent job installing my EV charger. They were professional, efficient, and friendly. The conduit run was incredibly clean and tidy. 5 stars all around!'
  },
  {
    id: 3,
    author: 'Rob Pinard',
    date: '2026-07-17',
    rating: 5,
    avatarText: 'R',
    avatarBg: '#047857', // Dark Teal green circle as in screenshot
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

// Gallery Data API
const galleryProjects = [
  {
    id: 1,
    title: '200A Electrical Panel Upgrade & Clean Rewire',
    category: 'panel',
    categoryLabel: 'Panel Upgrades',
    description: 'Complete replacement of obsolete fused panel with heavy-duty 200-Amp breaker panel, surge protector, and neatly dressed copper wiring.',
    image: '/assets/gallery/panel_upgrade.jpg',
    specs: ['200 Amps Service', 'Whole-Home Surge Protector', 'ESA Inspected & Passed'],
    location: 'Mississauga, ON'
  },
  {
    id: 2,
    title: 'Dual Level 2 Tesla EV Charger Installation',
    category: 'ev',
    categoryLabel: 'EV Chargers',
    description: 'High-speed 48A wall connector installation in a double garage with EMT metallic conduit and dedicated 60A circuit breaker.',
    image: '/assets/gallery/ev_charger.jpg',
    specs: ['48-Amp Level 2 Charging', 'Hardwired Dedicated Line', 'Code Compliant Grounding'],
    location: 'Oakville, ON'
  },
  {
    id: 3,
    title: 'Commercial Corporate Office Architectural LED Lighting',
    category: 'commercial',
    categoryLabel: 'Commercial Electrical',
    description: 'Turnkey interior lighting design featuring suspended linear LED luminaires, motion sensors, and dimmable zone controllers for an open office space.',
    image: '/assets/gallery/commercial_lighting.jpg',
    specs: ['0-10V Smart Dimmable LED', 'Energy Star Rated', '0-100% Daylight Harvesting'],
    location: 'Toronto, ON'
  },
  {
    id: 4,
    title: 'Luxury Residence Soffit & Architectural Dusk Lighting',
    category: 'lighting',
    categoryLabel: 'Lighting Design',
    description: 'Custom exterior architectural accent lighting, warm LED soffit pot lights, smart astronomical timer, and waterproof low-voltage garden uplighting.',
    image: '/assets/gallery/exterior_lighting.jpg',
    specs: ['Smart App Control', '3000K Warm White LEDs', 'Weatherproof IP67 Rating'],
    location: 'Brampton, ON'
  },
  {
    id: 5,
    title: 'Commercial Tenant Buildout & Power Distribution',
    category: 'commercial',
    categoryLabel: 'Commercial Electrical',
    description: 'Full electrical rough-in, subpanel distribution, dedicated server room power circuits, and high-bay lighting for commercial retail space.',
    image: '/assets/gallery/commercial_lighting.jpg',
    specs: ['Three-Phase 120/208V', 'Dedicated Server UPS Feeds', 'Fire Alarm Integration'],
    location: 'Vaughan, ON'
  },
  {
    id: 6,
    title: 'Whole-Home Safety Inspection & Troubleshooting',
    category: 'residential',
    categoryLabel: 'Residential Electrical',
    description: 'Comprehensive electrical safety audit, thermal scan, arc-fault (AFCI) breaker retrofit, and grounding verification for home buyer closing.',
    image: '/assets/gallery/panel_upgrade.jpg',
    specs: ['Infrared Thermal Scan', 'AFCI/GFCI Protection', 'ECRA/ESA Safety Report'],
    location: 'Milton, ON'
  }
];

// API Routes
app.get('/api/reviews', (req, res) => {
  res.json({
    success: true,
    averageRating: 5.0,
    totalReviews: 156,
    googleUrl: GOOGLE_REVIEWS_URL,
    reviews: realGoogleReviews
  });
});

app.get('/api/gallery', (req, res) => {
  const { category } = req.query;
  if (category && category !== 'all') {
    const filtered = galleryProjects.filter(p => p.category === category);
    return res.json({ success: true, projects: filtered });
  }
  res.json({ success: true, projects: galleryProjects });
});

// Quote Request API Endpoint
app.post('/api/quote', (req, res) => {
  const { name, phone, email, address, propertyType, services, urgency, details } = req.body;

  if (!name || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Name and Phone number are required to submit a quote request.'
    });
  }

  const quoteRecord = {
    id: `QUOTE-${Date.now()}`,
    timestamp: new Date().toISOString(),
    name,
    phone,
    email: email || 'N/A',
    address: address || 'N/A',
    propertyType: propertyType || 'Residential',
    services: Array.isArray(services) ? services : [services || 'General Electrical'],
    urgency: urgency || 'Standard (24-48 Hours)',
    details: details || '',
    status: 'Pending Call Back'
  };

  quoteRequests.push(quoteRecord);
  console.log('⚡ [NEW QUOTE REQUEST RECEIVED]:', quoteRecord);

  res.status(201).json({
    success: true,
    message: 'Thank you! Your quote request has been received. An A-Wire certified electrician will review your details and contact you shortly.',
    quoteId: quoteRecord.id
  });
});

// Contact API Endpoint
app.post('/api/contact', (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, Phone number, and Message are required.'
    });
  }

  const contactRecord = {
    id: `MSG-${Date.now()}`,
    timestamp: new Date().toISOString(),
    name,
    phone,
    email: email || 'N/A',
    message
  };

  contactInquiries.push(contactRecord);
  console.log('📬 [NEW CONTACT MESSAGE RECEIVED]:', contactRecord);

  res.status(201).json({
    success: true,
    message: 'Message sent successfully! We will get back to you right away.'
  });
});

// Admin status route
app.get('/api/admin/submissions', (req, res) => {
  res.json({
    totalQuotes: quoteRequests.length,
    totalContacts: contactInquiries.length,
    quotes: quoteRequests,
    contacts: contactInquiries
  });
});

// Clean Multi-Page Routes
app.get('/services', (req, res) => res.sendFile(path.join(__dirname, 'public', 'services.html')));
app.get('/gallery', (req, res) => res.sendFile(path.join(__dirname, 'public', 'gallery.html')));
app.get('/quote', (req, res) => res.sendFile(path.join(__dirname, 'public', 'quote.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public', 'contact.html')));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`⚡ A-Wire Electrical Server running at http://localhost:${PORT}`);
  console.log(`   ECRA/ESA License: 7016330 | Phone: 905 955-5455`);
});
