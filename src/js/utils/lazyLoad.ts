/**
 * Image lazy loading utility using Intersection Observer
 */

// Lazy loading images (performance optimization)
function lazyLoadImages(): void {
    // 이미지를 관찰할 옵션: 뷰포트에 10% 이상 보일 때 로드
    const options = {
        root: null, // viewport를 root로 사용
        rootMargin: '0px',
        threshold: 0.1 // 10% 이상 보일 때 로드
    };

    // Intersection Observer 생성
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // 뷰포트에 들어왔을 때만 처리
            if (!entry.isIntersecting) return;

            const img = entry.target as HTMLImageElement;
            const dataSrc = img.getAttribute('data-src');

            if (dataSrc) {
                img.src = dataSrc;
                img.onload = function () {
                    img.removeAttribute('data-src');
                    // 이미지가 로드되면 관찰 중단
                    observer.unobserve(img);
                };
            }
        });
    }, options);

    // data-src 속성이 있는 모든 이미지를 관찰
    const images = document.querySelectorAll<HTMLImageElement>('img[data-src]');
    images.forEach(img => {
        observer.observe(img);
    });
}

export { lazyLoadImages };