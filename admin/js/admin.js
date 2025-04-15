// 관리자 대시보드 메인 스크립트
document.addEventListener('DOMContentLoaded', () => {
    // 인증 확인
    checkAuthentication();
    
    // 네비게이션 처리
    initNavigation();
    
    // 로그아웃 처리
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    
    // 모달 관련 이벤트 처리
    initModal();

    // 확인 모달 초기화
    initConfirmModal();

    // 각 섹션 모듈 초기화
    initDashboard();
    initProjects();
    initAddProject();
    initMessages();
    initSettings();
});

// 인증 확인 함수
function checkAuthentication() {
    const token = localStorage.getItem('adminToken');
    const username = localStorage.getItem('adminUsername');
    
    if (!token) {
        // 토큰이 없으면 로그인 페이지로 이동
        window.location.href = 'login.html';
        return;
    }
    
    // 사용자 이름 표시
    if (username) {
        const usernameElement = document.getElementById('admin-username');
        if (usernameElement) {
            usernameElement.textContent = username;
        }
    }
}

// 로그아웃 처리 함수
function handleLogout() {
    // 로컬 스토리지 클리어
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    
    // 로그인 페이지로 이동
    window.location.href = 'login.html';
}

// 네비게이션 처리 함수
function initNavigation() {
    const navLinks = document.querySelectorAll('.admin-menu a[data-section]');
    const sections = document.querySelectorAll('.admin-section');
    const adminTitleElement = document.querySelector('.admin-title h1');
    
    if (!navLinks.length || !sections.length || !adminTitleElement) return;
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const sectionId = link.getAttribute('data-section');
            
            // 활성 링크 및 섹션 업데이트
            navLinks.forEach(navLink => navLink.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            sections.forEach(section => section.classList.remove('active'));
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // 페이지 제목 업데이트
            adminTitleElement.textContent = link.textContent.trim();
        });
    });
}

// 모달 초기화 함수
function initModal() {
    // 모달 닫기 버튼 처리
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
    
    // 모달 영역 클릭 시 닫기
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// 확인 모달 초기화 함수
function initConfirmModal() {
    const cancelBtn = document.getElementById('cancel-action-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            const confirmModal = document.getElementById('confirm-modal');
            if (confirmModal) {
                confirmModal.style.display = 'none';
            }
        });
    }
}

// 공통 유틸리티 함수
function debounce(func, wait = 300) {
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

// 알림 메시지 표시 함수
function showNotification(message, type = 'success') {
    // 기존 알림이 있으면 제거
    const existingNotification = document.querySelector('.admin-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 새 알림 생성
    const notification = document.createElement('div');
    notification.className = `admin-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="close-notification">&times;</button>
        </div>
    `;
    
    // 알림 추가
    document.body.appendChild(notification);
    
    // 알림 표시 애니메이션
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 닫기 버튼 이벤트
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // 자동 닫기 (5초 후)
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}
