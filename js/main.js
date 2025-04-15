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

// 연락처 폼 제출 처리 - 정적 웹사이트용으로 수정됨
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
            
            // 정적 웹사이트에서는 실제 전송 불가능, 이메일 링크로 대체
            handleStaticFormSubmission(formData);
        });
    }
}

// 정적 웹사이트에서의 폼 처리 방법
function handleStaticFormSubmission(formData) {
    try {
        // 데이터 확인
        console.log('입력된 데이터:', formData);
        
        // 이메일 클라이언트로 연결 (mailto: 링크 활용)
        const subject = encodeURIComponent(formData.subject);
        const body = encodeURIComponent(`이름: ${formData.name}\n이메일: ${formData.email}\n메시지: ${formData.message}`);
        
        // 사용자에게 이메일 클라이언트를 열지 묻기
        if (confirm('이메일 앱으로 메시지를 전송하시겠습니까?')) {
            window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
        } else {
            alert('연락해 주셔서 감사합니다! 아래 이메일로 직접 연락주세요: your-email@example.com');
        }
        
        // 폼 초기화
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('message').value = '';
        
    } catch (error) {
        console.error('처리 오류:', error);
        alert('처리 중 오류가 발생했습니다. 직접 이메일로 연락해주세요: your-email@example.com');
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