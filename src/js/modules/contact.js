/**
 * 연락처 폼 처리 모듈
 */

import { loadConfig } from '../utils/dataLoader.js';

// 연락처 폼 제출 처리 - 정적 웹사이트용
async function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    // 사이트 설정 로드 (이메일 주소)
    const config = await loadConfig();
    const email = config.site.email || 'your-email@example.com';
    
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
        handleStaticFormSubmission(formData, email);
    });
}

// 정적 웹사이트에서의 폼 처리 방법
function handleStaticFormSubmission(formData, email) {
    try {
        // 데이터 확인
        console.log('입력된 데이터:', formData);
        
        // 이메일 클라이언트로 연결 (mailto: 링크 활용)
        const subject = encodeURIComponent(formData.subject);
        const body = encodeURIComponent(`이름: ${formData.name}\n이메일: ${formData.email}\n메시지: ${formData.message}`);
        
        // 사용자에게 이메일 클라이언트를 열지 묻기
        if (confirm('이메일 앱으로 메시지를 전송하시겠습니까?')) {
            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        } else {
            alert(`연락해 주셔서 감사합니다! 아래 이메일로 직접 연락주세요: ${email}`);
        }
        
        // 폼 초기화
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('message').value = '';
        
    } catch (error) {
        console.error('처리 오류:', error);
        alert(`처리 중 오류가 발생했습니다. 직접 이메일로 연락해주세요: ${email}`);
    }
}

export { initContactForm };