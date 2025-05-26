/**
 * Simply Productive Software - Main JavaScript
 * Handles navigation, smooth scrolling, and dynamic interactions
 */

class SiteController {
    constructor() {
        this.init();
    }

    init() {
        this.setCurrentYear();
        this.setupNavigation();
        this.setupSmoothScrolling();
        this.setupScrollSpy();
        this.setupImageLazyLoading();
        this.setupAnalytics();
    }

    /**
     * Sets the current year in the footer
     */
    setCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    /**
     * Sets up mobile navigation toggle
     */
    setupNavigation() {
        const menuToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            });
        }
    }

    /**
     * Sets up smooth scrolling for anchor links
     */
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const href = anchor.getAttribute('href');
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Close mobile menu after navigation
                const navMenu = document.getElementById('nav-menu');
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    /**
     * Sets up scroll spy functionality to highlight active nav items
     */
    setupScrollSpy() {
        const sections = document.querySelectorAll('.product');
        const navLinks = document.querySelectorAll('#nav-menu a[href^="#"]');
        
        if (!sections.length || !navLinks.length) return;

        const updateActiveNavItem = () => {
            let currentSection = '';
            const headerOffset = 120; // Account for sticky header
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= headerOffset && rect.bottom >= headerOffset) {
                    currentSection = section.id;
                }
            });
            
            // Update active states
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href').substring(1); // Remove #
                if (href === currentSection) {
                    link.classList.add('active');
                }
            });
        };

        // Throttle scroll events for better performance
        let scrollTimeout;
        const throttledUpdate = () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                updateActiveNavItem();
                scrollTimeout = null;
            }, 16); // ~60fps
        };

        window.addEventListener('scroll', throttledUpdate);
        window.addEventListener('load', updateActiveNavItem);
    }

    /**
     * Sets up lazy loading for images to improve performance
     */
    setupImageLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('fade-in');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Sets up basic analytics tracking for user interactions
     */
    setupAnalytics() {
        // Track CTA button clicks
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', () => {
                const productName = button.closest('.product').querySelector('h2').textContent;
                this.trackEvent('cta_click', { product: productName });
            });
        });

        // Track navigation usage
        document.querySelectorAll('#nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                const section = link.getAttribute('href').substring(1);
                this.trackEvent('navigation_click', { section });
            });
        });
    }

    /**
     * Simple event tracking (can be extended with analytics services)
     */
    trackEvent(eventName, data = {}) {
        // For now, just log to console. In production, this could send to analytics
        console.log('Event:', eventName, data);
        
        // Example: Send to Google Analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SiteController();
});
