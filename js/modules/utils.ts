/**
 * Utility Module
 * Contains reusable helper functions for the application
 */

/**
 * Lazy load images to improve performance
 * Replaces data-src with src attribute when images are in viewport
 */
function lazyLoadImages(): void {
    if ('IntersectionObserver' in window) {
        // Use Intersection Observer API for modern browsers
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.onload = () => img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        }, { rootMargin: '50px' });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without Intersection Observer
        document.querySelectorAll('img[data-src]').forEach(img => {
            const imgElement = img as HTMLImageElement;
            const dataSrc = imgElement.getAttribute('data-src');
            if (dataSrc) {
                imgElement.setAttribute('src', dataSrc);
                imgElement.onload = () => imgElement.classList.add('loaded');
            }
        });
    }
}

/**
 * Detect mobile devices and add appropriate class to body
 */
function detectMobileDevice(): boolean {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
    return isMobile;
}

/**
 * Update copyright year dynamically
 */
function updateCopyrightYear(): void {
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.copyright-year').forEach(element => {
        element.textContent = currentYear.toString();
    });
}

/**
 * Debounce function to limit execution rate of handlers
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} - Debounced function
 */
function debounce<T extends (...args: any[]) => any>(func: T, wait = 100): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    
    return function executedFunction(...args: Parameters<T>): void {
        const later = () => {
            if (timeout) clearTimeout(timeout);
            func(...args);
        };
        
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit execution rate
 * @param {Function} func - Function to throttle
 * @param {number} limit - Milliseconds to limit executions
 * @returns {Function} - Throttled function
 */
function throttle<T extends (...args: any[]) => any>(func: T, limit = 100): (...args: Parameters<T>) => void {
    let inThrottle = false;
    
    return function executedFunction(...args: Parameters<T>): void {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Format date to locale string
 * @param {string} dateString - Date string to format
 * @returns {string} - Formatted date
 */
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export {
    lazyLoadImages,
    detectMobileDevice,
    updateCopyrightYear,
    debounce,
    throttle,
    formatDate
};