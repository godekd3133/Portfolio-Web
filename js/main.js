// 페이지 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', () => {
    // 스크롤 애니메이션
    initSmoothScroll();
    
    // 폼 제출 처리
    initContactForm();
    
    // 프로젝트 카드 애니메이션
    initProjectCards();
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

// 연락처 폼 제출 처리
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // API 호출
            sendContactForm(formData);
        });
    }
}

// 폼 데이터 전송 (백엔드 연동)
async function sendContactForm(formData) {
    try {
        // 실제 API 호출 부분은 백엔드가 구현되면 추가
        console.log('전송할 데이터:', formData);
        
        // 성공 메시지 표시 (실제로는 API 응답에 따라 처리)
        alert('메시지가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.');
        
        // 폼 초기화
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('message').value = '';
        
    } catch (error) {
        console.error('메시지 전송 실패:', error);
        alert('메시지 전송에 실패했습니다. 다시 시도해주세요.');
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