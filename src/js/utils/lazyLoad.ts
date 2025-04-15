/**
 * Image lazy loading utility
 */

// Lazy loading images (performance optimization)
function lazyLoadImages(): void {
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
        img.setAttribute('src', img.getAttribute('data-src') || '');
        img.onload = function() {
            img.removeAttribute('data-src');
        };
    });
}

export { lazyLoadImages };