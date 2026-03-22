/*
AGRICET Mocks - PJTSAU Agriculture Practice Platform
Main JavaScript File
Version: 1.0.0
*/

// DOM Ready function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavigation();
    initThemeToggle();
    initFormValidation();
    initAnalytics();
    initAccessibility();
    
    // Add page-specific initialization
    if (document.body.classList.contains('mock-test-page')) {
        initMockTestEngine();
    }
});

// Navigation initialization
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            if (!isExpanded) {
                this.innerHTML = '<i class="fas fa-times"></i>';
                this.setAttribute('aria-label', 'Close navigation');
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
                this.setAttribute('aria-label', 'Toggle navigation');
            }
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768 && navMenu.classList.contains('active')) {
                navToggle.click();
            }
        });
    });
}

// Theme toggle initialization
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            html.classList.add(savedTheme);
            updateThemeToggleText(themeToggle, savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            html.classList.add('dark-mode');
            updateThemeToggleText(themeToggle, 'dark-mode');
        }
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
            const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
            
            html.classList.remove(currentTheme);
            html.classList.add(newTheme);
            
            localStorage.setItem('theme', newTheme);
            updateThemeToggleText(this, newTheme);
        });
    }
}

function updateThemeToggleText(element, theme) {
    const icon = element.querySelector('i');
    const span = element.querySelector('span');
    
    if (theme === 'dark-mode') {
        icon.className = 'fas fa-moon';
        span.textContent = 'Dark Mode';
    } else {
        icon.className = 'fas fa-sun';
        span.textContent = 'Light Mode';
    }
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Email validation
            const emailInputs = form.querySelectorAll('input[type="email"]');
            emailInputs.forEach(input => {
                if (input.value && !isValidEmail(input.value)) {
                    e.preventDefault();
                    isValid = false;
                    showError(input, 'Please enter a valid email address');
                }
            });
            
            // Required fields
            const requiredInputs = form.querySelectorAll('[required]');
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    e.preventDefault();
                    isValid = false;
                    showError(input, 'This field is required');
                }
            });
        });
    });
}

function isValidEmail(email) {
    const re = /^(([^<>()$$$$\\.,;:\s@"]+(\.[^<>()$$$$\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showError(input, message) {
    // Remove existing error
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Add new error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#f44336';
    errorDiv.style.fontSize = '0.75rem';
    errorDiv.style.marginTop = '0.25rem';
    
    input.parentNode.appendChild(errorDiv);
    
    // Focus on first invalid field
    if (input.parentNode.querySelector('input, select, textarea')) {
        input.focus();
    }
}

// Analytics initialization
function initAnalytics() {
    // Track page views
    if (typeof gtag !== 'undefined') {
        gtag('config', 'G-XXXXXXXXXX', {
            'page_title': document.title,
            'page_location': window.location.href,
            'page_path': window.location.pathname
        });
    }
    
    // Track outbound links
    const outboundLinks = document.querySelectorAll('a[href^="http"]:not([href*="pjtsau.edu.in"])');
    outboundLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'outbound_click', {
                    'event_category': 'Outbound Links',
                    'event_label': this.href,
                    'transport_type': 'beacon'
                });
            }
        });
    });
}

// Accessibility enhancements
function initAccessibility() {
    // Add focus styles for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-focus');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-focus');
    });
    
    // Ensure all interactive elements have proper ARIA labels
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (button.textContent.trim()) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
}

// Mock Test Engine (placeholder - would be expanded in production)
function initMockTestEngine() {
    // This would contain the full test engine logic
    console.log('Mock Test Engine initialized');
    
    // Example: Auto-start timer for mock tests
    const timerElements = document.querySelectorAll('.test-timer');
    timerElements.forEach(timer => {
        const duration = parseInt(timer.dataset.duration) || 1200; // default 20 minutes
        startTimer(timer, duration);
    });
}

function startTimer(element, seconds) {
    let remaining = seconds;
    const interval = setInterval(() => {
        const mins = Math.floor(remaining / 60);
        const secs = remaining % 60;
        element.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        
        if (remaining <= 0) {
            clearInterval(interval);
            element.textContent = '0:00';
            alert('Time is up! Your test has been submitted.');
        }
        remaining--;
    }, 1000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const later = () => {
            clearTimeout(timeout);
            func(...arguments);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for older browsers
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}
