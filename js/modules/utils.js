/**
 * 유틸리티 기능을 담당하는 모듈
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

// 동적 컴포넌트 로드
async function loadComponent(url, targetSelector) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`컴포넌트 로드 실패: ${url}`);
        }
        const html = await response.text();
        const targetElement = document.querySelector(targetSelector);
        
        if (targetElement) {
            targetElement.innerHTML = html;
        } else {
            console.error(`대상 요소를 찾을 수 없음: ${targetSelector}`);
        }
        
        return true;
    } catch (error) {
        console.error('컴포넌트 로드 에러:', error);
        return false;
    }
}

// 현재 연도 업데이트
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('.copyright-year');
    
    copyrightElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// 디바운스 함수
function debounce(func, wait) {
    let timeout;
    
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export { lazyLoadImages, loadComponent, updateCopyrightYear, debounce };
