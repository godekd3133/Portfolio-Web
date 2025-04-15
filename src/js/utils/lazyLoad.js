/**
 * 이미지 지연 로딩 유틸리티
 */

// 이미지 지연 로딩 (성능 최적화)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = function() {
            img.removeAttribute('data-src');
        };
    });
}

export { lazyLoadImages };