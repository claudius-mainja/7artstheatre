// 7 Arts Theatre - Main JavaScript
// =================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeroEffects();
    initParallax3D();
    initEventCards();
    initCounters();
    initForms();
    initModals();
    initTickets();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-theatre-black/95', 'backdrop-blur-lg', 'shadow-lg');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('bg-theatre-black/95', 'backdrop-blur-lg', 'shadow-lg');
            navbar.classList.add('bg-transparent');
        }
    });

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ============================================
// HERO EFFECTS
// ============================================
function initHeroEffects() {
    createParticles();
    initMouseFollower();
    initHeroSlider();
}

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Auto-advance slides
    setInterval(() => {
        goToSlide((currentSlide + 1) % totalSlides);
    }, 5000);
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    function goToSlide(index) {
        // Remove active from current
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Set new slide
        currentSlide = index;
        
        // Add active to new
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        particlesContainer.appendChild(particle);
    }
}

function initMouseFollower() {
    const hero = document.getElementById('hero');
    const heroContent = document.getElementById('hero-content');
    
    if (!hero || !heroContent) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    });

    function animate() {
        // Smooth easing
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        // Apply 3D transform
        heroContent.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotateX(${-currentY * 0.5}deg) rotateY(${currentX * 0.5}deg)`;

        requestAnimationFrame(animate);
    }

    animate();
}

// ============================================
// 3D PARALLAX TILT EFFECT
// ============================================
function initParallax3D() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', handleTilt);
        element.addEventListener('mouseleave', handleTiltReset);
    });
}

function handleTilt(e) {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
}

function handleTiltReset(e) {
    const element = e.currentTarget;
    element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
}

// ============================================
// EVENT CARDS & DATA
// ============================================
const eventsData = [
    {
        id: 1,
        title: "Zimbabwe Music Awards 2026",
        date: "2026-03-15",
        category: "Award Ceremony",
        price: 50,
        image: "event1",
        description: "The prestigious Zimbabwe Music Awards returns to 7 Arts Theatre"
    },
    {
        id: 2,
        title: "Shona Cultural Festival",
        date: "2026-03-22",
        category: "Cultural",
        price: 30,
        image: "event2",
        description: "Celebrate the rich Shona culture with music, dance, and art"
    },
    {
        id: 3,
        title: "Corporate Leadership Summit",
        date: "2026-04-05",
        category: "Corporate",
        price: 100,
        image: "event3",
        description: "Network with industry leaders and grow your business"
    },
    {
        id: 4,
        title: "Gospel Night Live",
        date: "2026-04-12",
        category: "Musical",
        price: 25,
        image: "event4",
        description: "An evening of worship and praise with top gospel artists"
    },
    {
        id: 5,
        title: "Tech Innovation Expo",
        date: "2026-04-20",
        category: "Exhibition",
        price: 20,
        image: "event5",
        description: "Discover the latest technology from Zimbabwe and beyond"
    },
    {
        id: 6,
        title: "Charity Gala Dinner",
        date: "2026-05-01",
        category: "Charity",
        price: 150,
        image: "event6",
        description: "Support local charities while enjoying a night of elegance"
    }
];

function initEventCards() {
    const eventsContainer = document.getElementById('upcoming-events');
    if (!eventsContainer) return;

    // Load upcoming events (first 3)
    const upcomingEvents = eventsData.slice(0, 3);
    
    upcomingEvents.forEach((event, index) => {
        const eventCard = createEventCard(event);
        eventsContainer.appendChild(eventCard);
    });
}

function createEventCard(event) {
    const date = new Date(event.date);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    
    const card = document.createElement('div');
    card.className = 'event-card group';
    card.setAttribute('data-tilt', '');
    
    card.innerHTML = `
        <div class="event-image relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-theatre-red to-theatre-dark"></div>
            <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23D4AF37\\' fill-opacity=\\'0.1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
            <div class="event-date">
                <div class="day">${day}</div>
                <div class="month">${month}</div>
            </div>
        </div>
        <div class="event-content">
            <span class="event-tag">${event.category}</span>
            <h3 class="font-display text-xl font-semibold mb-2 group-hover:text-gold-accent transition-colors">${event.title}</h3>
            <p class="text-gray-400 text-sm mb-4">${event.description}</p>
            <div class="flex items-center justify-between">
                <span class="event-price">$${event.price}</span>
                <a href="pages/tickets.html?event=${event.id}" class="text-gold-accent hover:text-white transition-colors inline-flex items-center">
                    Buy Ticket
                    <svg class="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </a>
            </div>
        </div>
    `;
    
    return card;
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-card .text-4xl, .stat-card .text-5xl');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, stepTime);
}

// ============================================
// FORMS
// ============================================
function initForms() {
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Event Posting Form
    const eventPostForm = document.getElementById('event-post-form');
    if (eventPostForm) {
        eventPostForm.addEventListener('submit', handleEventPostForm);
    }

    // Ticket Purchase Form
    const ticketForm = document.getElementById('ticket-form');
    if (ticketForm) {
        ticketForm.addEventListener('submit', handleTicketPurchase);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link with form data
    const mailtoLink = `mailto:pastorjeph@7artstheatre.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    window.location.href = mailtoLink;
    
    showNotification('Thank you for contacting us! Your email client should open now.');
    form.reset();
}

function handleEventPostForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    const eventName = formData.get('eventName');
    const eventDate = formData.get('eventDate');
    const eventType = formData.get('eventType');
    const organizerName = formData.get('organizerName');
    const organizerEmail = formData.get('organizerEmail');
    const organizerPhone = formData.get('organizerPhone');
    const eventDescription = formData.get('eventDescription');
    const expectedAttendees = formData.get('expectedAttendees');
    const requirements = formData.get('requirements');
    
    // Create mailto link for event submission
    const subject = encodeURIComponent(`New Event Submission: ${eventName}`);
    const body = encodeURIComponent(`
EVENT SUBMISSION FORM
=====================

Event Details:
- Event Name: ${eventName}
- Date: ${eventDate}
- Type: ${eventType}
- Expected Attendees: ${expectedAttendees}
- Description: ${eventDescription}
- Special Requirements: ${requirements}

Organizer Information:
- Name: ${organizerName}
- Email: ${organizerEmail}
- Phone: ${organizerPhone}

This event has been submitted for review. 7 Arts Theatre team will contact you shortly.
    `);
    
    window.location.href = `mailto:pastorjeph@7artstheatre.com?subject=${subject}&body=${body}`;
    
    showNotification('Your event has been submitted! We will review it and contact you shortly.');
    form.reset();
}

function handleTicketPurchase(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const quantity = parseInt(formData.get('quantity'));
    const eventId = formData.get('eventId');
    const ticketType = formData.get('ticketType');
    
    // Find event details
    const event = eventsData.find(ev => ev.id === parseInt(eventId));
    const totalPrice = event ? event.price * quantity : 0;
    
    // Generate unique ticket ID
    const ticketId = generateTicketId();
    const barcode = generateBarcode();
    
    // Store ticket data (in real app, this would go to a server)
    const ticketData = {
        ticketId,
        barcode,
        event,
        name,
        email,
        phone,
        quantity,
        ticketType,
        totalPrice,
        purchaseDate: new Date().toISOString()
    };
    
    // Save to localStorage for demo
    localStorage.setItem(`ticket_${ticketId}`, JSON.stringify(ticketData));
    
    // Display ticket
    displayTicket(ticketData);
    
    // Close modal if open
    const modal = document.getElementById('ticket-modal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    showNotification('Ticket purchased successfully! Your e-ticket is now displayed.');
}

// ============================================
// MODALS
// ============================================
function initModals() {
    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal(e.target.id);
        }
    });

    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// ============================================
// TICKET SYSTEM
// ============================================
function initTickets() {
    // Check if we're on the events page
    loadAllEvents();
    
    // Check URL for event parameter
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event');
    
    if (eventId) {
        const purchaseSection = document.getElementById('purchase-section');
        if (purchaseSection) {
            purchaseSection.scrollIntoView({ behavior: 'smooth' });
            
            // Pre-select event
            const eventSelect = document.getElementById('event-select');
            if (eventSelect) {
                eventSelect.value = eventId;
                updatePrice();
            }
        }
    }
}

function loadAllEvents() {
    const eventsContainer = document.getElementById('all-events');
    if (!eventsContainer) return;

    eventsContainer.innerHTML = '';
    
    eventsData.forEach(event => {
        const eventCard = createEventCard(event);
        eventsContainer.appendChild(eventCard);
    });

    // Populate event select dropdown
    const eventSelect = document.getElementById('event-select');
    if (eventSelect) {
        eventsData.forEach(event => {
            const option = document.createElement('option');
            option.value = event.id;
            option.textContent = `${event.title} - $${event.price}`;
            option.dataset.price = event.price;
            eventSelect.appendChild(option);
        });

        eventSelect.addEventListener('change', updatePrice);
    }
}

function updatePrice() {
    const eventSelect = document.getElementById('event-select');
    const quantityInput = document.getElementById('quantity');
    const totalPrice = document.getElementById('total-price');
    
    if (!eventSelect || !quantityInput || !totalPrice) return;
    
    const selectedOption = eventSelect.options[eventSelect.selectedIndex];
    const price = parseInt(selectedOption.dataset.price) || 0;
    const quantity = parseInt(quantityInput.value) || 1;
    
    totalPrice.textContent = `$${price * quantity}`;
}

function generateTicketId() {
    return '7AT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function generateBarcode() {
    const bars = [];
    const chars = '01';
    
    for (let i = 0; i < 30; i++) {
        bars.push(chars[Math.floor(Math.random() * chars.length)]);
    }
    
    return bars;
}

function displayTicket(ticketData) {
    const ticketContainer = document.getElementById('purchased-ticket');
    if (!ticketContainer) return;

    const { event, name, quantity, ticketType, totalPrice, ticketId, barcode, purchaseDate } = ticketData;
    const date = new Date(event.date);
    
    ticketContainer.innerHTML = `
        <div class="ticket-card">
            <div class="ticket-header">
                <h3 class="font-display text-2xl font-bold">${event.title}</h3>
                <p class="text-white/80">${date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div class="ticket-body">
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p class="text-gray-400 text-sm">Attendee</p>
                        <p class="font-semibold">${name}</p>
                    </div>
                    <div>
                        <p class="text-gray-400 text-sm">Ticket Type</p>
                        <p class="font-semibold">${ticketType}</p>
                    </div>
                    <div>
                        <p class="text-gray-400 text-sm">Quantity</p>
                        <p class="font-semibold">${quantity}</p>
                    </div>
                    <div>
                        <p class="text-gray-400 text-sm">Total Paid</p>
                        <p class="font-semibold text-gold-accent">$${totalPrice}</p>
                    </div>
                </div>
                
                <div class="border-t border-gray-700 pt-4 mb-4">
                    <p class="text-gray-400 text-sm text-center mb-2">Ticket ID: ${ticketId}</p>
                    <div class="barcode">
                        ${barcode.map(width => `<span style="width: ${width === '1' ? '3' : '1'}px"></span>`).join('')}
                    </div>
                    <p class="text-center text-xs text-gray-500">Scan for entry</p>
                </div>
                
                <div class="text-center">
                    <button onclick="printTicket()" class="btn-primary">
                        <span class="relative z-10">Print Ticket</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    ticketContainer.scrollIntoView({ behavior: 'smooth' });
}

function printTicket() {
    window.print();
}

// ============================================
// NOTIFICATIONS
// ============================================
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification fixed top-24 right-6 bg-theatre-dark border border-gold-accent text-white px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <svg class="w-6 h-6 text-gold-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <p>${message}</p>
        </div>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    // Hide after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ============================================
// TABS
// ============================================
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Remove active class from all buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            
            // Show selected tab content
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.remove('hidden');
            }
        });
    });
}

// Initialize tabs if on page with tabs
document.addEventListener('DOMContentLoaded', initTabs);

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .product-card, .testimonial-card, .pricing-card').forEach(el => {
        el.classList.add('opacity-0');
        observer.observe(el);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// ============================================
// MOUSE PARALLAX FOR SECTIONS
// ============================================
document.querySelectorAll('section').forEach(section => {
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        section.style.transform = `perspective(1000px) rotateX(${y * 2}deg) rotateY(${x * 2}deg)`;
    });

    section.addEventListener('mouseleave', () => {
        section.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// ============================================
// QUICK ACTIONS
// ============================================
// Open ticket modal from any buy button
document.querySelectorAll('[data-buy-ticket]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const eventId = e.target.dataset.eventId;
        const modal = document.getElementById('ticket-modal');
        
        if (modal && eventId) {
            const eventSelect = document.getElementById('event-select');
            if (eventSelect) {
                eventSelect.value = eventId;
                updatePrice();
            }
            openModal('ticket-modal');
        }
    });
});

// Quantity stepper
document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input');
        const currentValue = parseInt(input.value);
        const min = parseInt(input.min) || 1;
        const max = parseInt(input.max) || 10;
        
        if (btn.classList.contains('quantity-minus')) {
            if (currentValue > min) {
                input.value = currentValue - 1;
            }
        } else {
            if (currentValue < max) {
                input.value = currentValue + 1;
            }
        }
        
        updatePrice();
    });
});
