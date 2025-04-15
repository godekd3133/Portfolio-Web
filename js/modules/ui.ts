/**
 * UI Module
 * Handles all UI-related functionality including animations, scroll effects, and interactions
 */

/**
 * Initializes smooth scrolling for navigation links
 * Ensures all anchor links scroll smoothly to their target sections
 */
export function initSmoothScroll(): void {
    const navLinks = document.querySelectorAll('.nav-links a, .footer-links a, .cta-button[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(this: HTMLAnchorElement, e: MouseEvent) {
            // Only process internal links
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calculate header height dynamically
                    const header = document.querySelector('.main-navigation') as HTMLElement;
                    const headerHeight = header ? header.offsetHeight : 0;
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                    
                    // Update active navigation link
                    updateActiveNavLink(targetId);
                }
            }
        });
    });
}

/**
 * Updates the active state of navigation links based on current section
 * @param {string} activeId - The ID of the currently active section
 */
function updateActiveNavLink(activeId: string): void {
    // Remove active class from all links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current link
    const currentLink = document.querySelector(`.nav-links a[href="${activeId}"]`);
    if (currentLink) {
        currentLink.classList.add('active');
    }
}

/**
 * Initializes interactive effects for project cards
 * Adds hover animations and click events
 */
export function initProjectCards(): void {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add hover effects with CSS transitions instead of inline styles
        card.addEventListener('mouseenter', function(this: HTMLElement) {
            this.classList.add('card-hover');
        });
        
        card.addEventListener('mouseleave', function(this: HTMLElement) {
            this.classList.remove('card-hover');
        });
        
        // Add click event for mobile devices
        card.addEventListener('click', function(this: HTMLElement, event: MouseEvent) {
            // Only handle the card click if the target isn't a button or link
            const target = event.target as HTMLElement;
            if (!target.closest('a, button')) {
                this.classList.toggle('card-active');
            }
        });
    });
}

/**
 * Initializes scroll-based UI effects
 * Changes header styles on scroll and highlights active sections
 */
export function initScrollEffects(): void {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-navigation');
        const scrollPosition = window.scrollY;
        const scrollTop = document.documentElement.scrollTop;
        
        // Header scroll effect
        if (header) {
            if (scrollPosition > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Update active section based on scroll position
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop >= sectionTop - 100 && scrollTop < sectionTop + sectionHeight - 100) {
                const id = section.getAttribute('id');
                if (id) {
                    currentSectionId = '#' + id;
                }
            }
        });
        
        if (currentSectionId) {
            updateActiveNavLink(currentSectionId);
        }
        
        // Handle back-to-top button visibility
        const backToTopButton = document.querySelector('.back-to-top');
        if (backToTopButton) {
            if (scrollPosition > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }
    });
    
    // Initialize back-to-top button if it exists
    initBackToTopButton();
}

/**
 * Initializes the back-to-top button functionality
 */
function initBackToTopButton(): void {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) return;
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Implements lazy loading for images to improve performance
 * Uses IntersectionObserver API for modern browsers
 */
export function lazyLoadImages(): void {
    // Skip if the browser doesn't support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        fallbackLazyLoad();
        return;
    }
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    img.src = src;
                    img.addEventListener('load', () => {
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    });
                    
                    // Stop observing the image after loading
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    // Observe all images with data-src attribute
    const images = document.querySelectorAll('img.lazy-image');
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Fallback lazy loading for browsers that don't support IntersectionObserver
 */
function fallbackLazyLoad(): void {
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
        const dataSrc = img.getAttribute('data-src');
        if (dataSrc) {
            img.setAttribute('src', dataSrc);
            img.onload = function() {
                img.removeAttribute('data-src');
                img.classList.add('loaded');
            };
        }
    });
}

/**
 * Initializes the mobile menu toggle
 */
export function initMobileMenu(): void {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', function(this: HTMLElement) {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
        
        // Accessibility
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', (!expanded).toString());
        
        // Prevent body scrolling when menu is open
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(target) && 
            !menuToggle.contains(target)) {
            
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Close mobile menu when window is resized beyond mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        }
    });
}

/**
 * Initialize all UI functionality
 */
export function initUI(): void {
    initSmoothScroll();
    initScrollEffects();
    initProjectCards();
    initMobileMenu();
    lazyLoadImages();
    
    console.log('UI initialization complete');
}

// Export default initialization function
export default initUI;