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
        this.setupImageModal();
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
     * Sets up image modal/lightbox functionality
     */
    setupImageModal() {
        const modal = document.getElementById('image-modal');
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalClose = modal.querySelector('.modal-close');
        const modalBackdrop = modal.querySelector('.modal-backdrop');

        if (!modal || !modalImage || !modalTitle || !modalDescription) return;

        // Add click handlers to all product images
        document.querySelectorAll('.product-image img').forEach(img => {
            img.addEventListener('click', () => {
                this.openImageModal(img, modal, modalImage, modalTitle, modalDescription);
            });

            // Add keyboard support for accessibility
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', 'Click to view larger image');
            
            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openImageModal(img, modal, modalImage, modalTitle, modalDescription);
                }
            });
        });

        // Close modal handlers
        modalClose.addEventListener('click', () => {
            this.closeImageModal(modal);
        });

        modalBackdrop.addEventListener('click', () => {
            this.closeImageModal(modal);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeImageModal(modal);
            }
        });

        // Prevent scroll when modal is open
        modal.addEventListener('wheel', (e) => {
            e.preventDefault();
        });

        // Handle window resize to maintain text alignment
        window.addEventListener('resize', () => {
            if (modal.classList.contains('active')) {
                const modalInfo = modal.querySelector('.modal-info');
                const imageWidth = modalImage.offsetWidth;
                modalInfo.style.width = `${imageWidth}px`;
            }
        });
    }

    /**
     * Opens the image modal with the clicked image
     */
    openImageModal(clickedImg, modal, modalImage, modalTitle, modalDescription) {
        // Get product information
        const productSection = clickedImg.closest('.product');
        const productName = productSection.querySelector('h2').textContent;
        const productDesc = productSection.querySelector('p').textContent;

        // Set modal content
        modalImage.src = clickedImg.src;
        modalImage.alt = clickedImg.alt;
        modalTitle.textContent = productName;
        modalDescription.textContent = productDesc;

        // Show modal
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Constrain modal info width to image width after image loads
        modalImage.onload = () => {
            const modalInfo = modal.querySelector('.modal-info');
            const imageWidth = modalImage.offsetWidth;
            modalInfo.style.width = `${imageWidth}px`;
        };
        
        // Focus management for accessibility
        setTimeout(() => {
            modal.querySelector('.modal-close').focus();
        }, 300);

        // Track event
        this.trackEvent('image_modal_open', { product: productName });
    }

    /**
     * Closes the image modal
     */
    closeImageModal(modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Return focus to the trigger element if possible
        setTimeout(() => {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.closest('.image-modal')) {
                // Focus was in modal, return to first product image
                const firstProductImage = document.querySelector('.product-image img');
                if (firstProductImage) {
                    firstProductImage.focus();
                }
            }
        }, 100);

        this.trackEvent('image_modal_close');
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
