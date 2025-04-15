/**
 * Animations Module
 * Handles all animation-related functionality including scroll animations, hover effects, and transitions
 */

/**
 * Initializes intersection observer to trigger animations when sections come into view
 * Uses the IntersectionObserver API for better performance
 */
function initSectionAnimation(): void {
    const sections = document.querySelectorAll('section');
    const options: IntersectionObserverInit = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger staggered animations for child elements if they exist
                const animatedElements = entry.target.querySelectorAll('.animate-item');
                if (animatedElements.length > 0) {
                    animateElements(animatedElements);
                }
                
                // Stop observing once the animation has been triggered
                sectionObserver.unobserve(entry.target);
            }
        });
    }, options);
    
    sections.forEach(section => {
        section.classList.add('animate-section');
        sectionObserver.observe(section);
    });
}

/**
 * Animates a collection of elements with a staggered delay
 * @param {NodeList} elements - Elements to be animated
 */
function animateElements(elements: NodeListOf<Element>): void {
    elements.forEach((element, index) => {
        // Add staggered delay based on element index
        (element as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
        element.classList.add('visible');
    });
}

/**
 * Initializes hover animations for project cards
 * Uses CSS classes instead of inline styles for better performance
 */
function initProjectCards(): void {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Use classList methods instead of inline styles for better performance
        card.addEventListener('mouseenter', function(this: HTMLElement) {
            this.classList.add('card-hover');
        });
        
        card.addEventListener('mouseleave', function(this: HTMLElement) {
            this.classList.remove('card-hover');
        });
    });
}

/**
 * Initializes typing animation for headings or text elements
 * @param {string} selector - CSS selector for the element to animate
 * @param {string[]} textArray - Array of text strings to display
 * @param {number} typeSpeed - Typing speed in milliseconds
 * @param {number} backSpeed - Backspace speed in milliseconds
 * @param {boolean} loop - Whether to loop the animation
 */
function initTypingAnimation(
    selector: string, 
    textArray: string[], 
    typeSpeed: number = 100, 
    backSpeed: number = 50, 
    loop: boolean = true
): { stop: () => void } | undefined {
    const element = document.querySelector(selector);
    if (!element || !textArray.length) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout: ReturnType<typeof setTimeout>;
    
    function type(): void {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            // Delete characters
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Type characters
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Add cursor effect with CSS
        element.classList.add('typing');
        
        // Calculate typing speed
        let speed = isDeleting ? backSpeed : typeSpeed;
        
        // Check if complete
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at the end of typing
            speed = typeSpeed * 3;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to next text
            textIndex = loop ? (textIndex + 1) % textArray.length : Math.min(textIndex + 1, textArray.length - 1);
        }
        
        // Continue the animation
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(type, speed);
    }
    
    // Start the typing animation
    type();
    
    return {
        stop: () => clearTimeout(typingTimeout)
    };
}

/**
 * Hides the preloader with a smooth transition
 */
function hidePreloader(): void {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    // Add a class to body when content is ready
    document.body.classList.add('content-loaded');
    
    // Use requestAnimationFrame for smoother transitions
    requestAnimationFrame(() => {
        preloader.classList.add('hidden');
        
        // Remove from DOM after transition completes
        preloader.addEventListener('transitionend', () => {
            (preloader as HTMLElement).style.display = 'none';
        }, { once: true });
    });
}

/**
 * Initializes scroll-triggered animations
 */
function initScrollAnimations(): void {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    const options: IntersectionObserverInit = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get animation type from data attribute or use default
                const animationType = (entry.target as HTMLElement).dataset.animation || 'fade-in';
                entry.target.classList.add(animationType, 'animated');
                elementObserver.unobserve(entry.target);
            }
        });
    }, options);
    
    animatedElements.forEach(element => {
        elementObserver.observe(element);
    });
}

/**
 * Initializes parallax scrolling effect for background elements
 */
function initParallaxEffect(): void {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (!parallaxElements.length) return;
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat((element as HTMLElement).dataset.speed || '0.5');
            const offset = scrollPosition * speed;
            
            (element as HTMLElement).style.transform = `translateY(${offset}px)`;
        });
    });
}

/**
 * Main initialization function for all animations
 */
function initAnimations(): void {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        hidePreloader();
        initSectionAnimation();
        initProjectCards();
        initScrollAnimations();
        initParallaxEffect();
        
        // Initialize typing animation if elements exist
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            const texts = (typingElement as HTMLElement).dataset.texts ? 
                          JSON.parse((typingElement as HTMLElement).dataset.texts as string) : 
                          ['Creative Developer', 'UI/UX Designer', 'Problem Solver'];
            
            initTypingAnimation('.typing-text', texts);
        }
        
        console.log('Animations initialized successfully');
    });
}

// Export all animation functions
export { 
    initAnimations,
    initSectionAnimation,
    initProjectCards,
    initScrollAnimations,
    initTypingAnimation,
    initParallaxEffect,
    hidePreloader
};

// Default export for direct import
export default initAnimations;