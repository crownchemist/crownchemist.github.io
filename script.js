// Navigation functionality
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Find and activate current nav link
    const currentLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (currentLink && currentLink.classList.contains('nav-link')) {
        currentLink.classList.add('active');
    }
    
    // Close mobile menu if open
    document.getElementById('navLinks').classList.remove('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Form submissions
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
        document.getElementById('contactSuccess').classList.add('show');
        this.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            document.getElementById('contactSuccess').classList.remove('show');
        }, 5000);
    }, 1000);
});

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
        document.getElementById('bookingSuccess').classList.add('show');
        this.reset();
        
        // Hide success message after 8 seconds
        setTimeout(() => {
            document.getElementById('bookingSuccess').classList.remove('show');
        }, 8000);
    }, 1000);
});

// Set minimum date for booking (today)
document.getElementById('preferredDate').min = new Date().toISOString().split('T')[0];

// Only run single-page navigation logic on index.html
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '/crownchemist.github.io/') {
    // Smooth scroll for internal navigation
    document.addEventListener('DOMContentLoaded', function() {
        // Set home as active on load
        showPage('home');
    });

    // Handle browser back/forward
    window.addEventListener('popstate', function(e) {
        const page = e.state ? e.state.page : 'home';
        showPage(page);
    });

    // Add to browser history when navigating
    const originalShowPage = showPage;
    showPage = function(pageId) {
        originalShowPage(pageId);
        history.pushState({page: pageId}, '', `#${pageId}`);
    };

    // Handle direct URL access
    window.addEventListener('load', function() {
        const hash = window.location.hash.replace('#', '');
        const validPages = ['home', 'services', 'portfolio', 'about', 'contact', 'booking'];
        
        if (validPages.includes(hash)) {
            showPage(hash);
        } else {
            showPage('home');
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const navLinks = document.getElementById('navLinks');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Add loading states to buttons
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function() {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
});

// Enhanced form validation
document.getElementById('bookingForm').addEventListener('input', function(e) {
    const target = e.target;
    
    // Real-time validation feedback
    if (target.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (target.value && !emailRegex.test(target.value)) {
            target.style.borderColor = '#ff4444';
        } else {
            target.style.borderColor = '#8A2BE2';
        }
    }
    
    if (target.type === 'tel') {
        const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
        if (target.value && !phoneRegex.test(target.value)) {
            target.style.borderColor = '#ff4444';
        } else {
            target.style.borderColor = '#8A2BE2';
        }
    }
});

// Auto-resize textareas
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});

// Service price calculator
document.getElementById('service').addEventListener('change', function() {
    const budgetSelect = document.getElementById('budget');
    const serviceValue = this.value;
    
    // Auto-suggest budget based on service
    if (serviceValue === 'consultation') {
        budgetSelect.value = 'under-200';
    } else if (serviceValue === 'carved-art' || serviceValue === 'statement') {
        budgetSelect.value = '200-400';
    } else if (serviceValue === 'color-math' || serviceValue === 'fantasy' || serviceValue === 'correction') {
        budgetSelect.value = '200-400';
    } else if (serviceValue === 'transformation') {
        budgetSelect.value = '400-600';
    }
});
