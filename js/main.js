// 헤더 스크롤 이벤트
function initHeaderScroll() {
    const header = document.querySelector('.main-navigation');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 페이지 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', () => {
    // 스크롤 애니메이션
    initSmoothScroll();
    
    // 섹션 등장 애니메이션
    initSectionAnimation();
    
    // 프로젝트 카드 애니메이션
    initProjectCards();
    
    // 헤더 스크롤 이벤트
    initHeaderScroll();
    
    // 프리로더 제거
    hidePreloader();
});

// 백 투 탑 버튼
const backToTopButton = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 부드러운 스크롤 기능
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
}

// 섹션 등장 애니메이션
function initSectionAnimation() {
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, options);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// 프리로더 숨기기
function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
}

// 프로젝트 카드 애니메이션
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        });
    });
}

// 페이지 스크롤 시 헤더 스타일 변경
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-navigation');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        header.style.boxShadow = 'none';
    }
});

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

// 페이지 로드 후 이미지 로딩
window.addEventListener('load', lazyLoadImages);