/**
 * 내비게이션 관련 기능 모듈
 */

// 부드러운 스크롤 기능 초기화
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 페이지 스크롤 시 헤더 스타일 변경
function initScrollHeader() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-navigation');
        if (!header) return;
        
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            header.style.boxShadow = 'none';
        }
    });
}

// 내비게이션 모듈 초기화
function initNavigation() {
    initSmoothScroll();
    initScrollHeader();
}

export { initNavigation };