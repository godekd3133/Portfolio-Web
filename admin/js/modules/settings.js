// 설정 관리 모듈

// 설정 관리 초기화 함수
function initSettings() {
    // 설정 폼 초기화
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        // 설정 데이터 로드
        loadSettings();
        
        // 폼 제출 처리
        settingsForm.addEventListener('submit', handleSettingsSubmit);
    }
}

// 설정 데이터 로드 함수
function loadSettings() {
    // 임시 데이터 (데모용)
    const demoSettings = {
        name: '김민규',
        email: 'admin@example.com',
        siteTitle: '게임 개발자 포트폴리오',
        siteDescription: '창의적인 게임 경험을 만드는 데 열정을 가진 게임 개발자입니다.',
        siteKeywords: '게임 개발, 포트폴리오, Unity, Unreal',
        contactEmail: 'contact@example.com',
        githubUrl: 'https://github.com/username',
        linkedinUrl: 'https://linkedin.com/in/username',
        twitterUrl: 'https://twitter.com/username',
        artstationUrl: 'https://artstation.com/username'
    };
    
    // 설정 폼에 데이터 채우기
    fillSettingsForm(demoSettings);
}

// 설정 폼에 데이터 채우기 함수
function fillSettingsForm(settings) {
    // 계정 설정
    setFormValue('admin-name', settings.name);
    setFormValue('admin-email', settings.email);
    
    // 사이트 설정
    setFormValue('site-title', settings.siteTitle);
    setFormValue('site-description', settings.siteDescription);
    setFormValue('site-keywords', settings.siteKeywords);
    setFormValue('contact-email', settings.contactEmail);
    
    // 소셜 미디어 링크
    setFormValue('github-url', settings.githubUrl);
    setFormValue('linkedin-url', settings.linkedinUrl);
    setFormValue('twitter-url', settings.twitterUrl);
    setFormValue('artstation-url', settings.artstationUrl);
}

// 폼 값 설정 헬퍼 함수
function setFormValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.value = value || '';
    }
}

// 설정 폼 제출 처리 함수
function handleSettingsSubmit(e) {
    e.preventDefault();
    
    // 폼 데이터 수집
    const settingsData = {
        name: getFormValue('admin-name'),
        email: getFormValue('admin-email'),
        currentPassword: getFormValue('current-password'),
        newPassword: getFormValue('new-password'),
        confirmPassword: getFormValue('confirm-password'),
        siteTitle: getFormValue('site-title'),
        siteDescription: getFormValue('site-description'),
        siteKeywords: getFormValue('site-keywords'),
        contactEmail: getFormValue('contact-email'),
        githubUrl: getFormValue('github-url'),
        linkedinUrl: getFormValue('linkedin-url'),
        twitterUrl: getFormValue('twitter-url'),
        artstationUrl: getFormValue('artstation-url')
    };
    
    // 유효성 검사
    if (!settingsData.name) {
        showNotification('이름은 필수입니다.', 'error');
        return;
    }
    
    if (!settingsData.email) {
        showNotification('이메일은 필수입니다.', 'error');
        return;
    }
    
    // 이메일 형식 검사
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(settingsData.email)) {
        showNotification('유효한 이메일 주소를 입력하세요.', 'error');
        return;
    }
    
    // 비밀번호 변경 시 유효성 검사
    if (settingsData.newPassword || settingsData.confirmPassword) {
        if (!settingsData.currentPassword) {
            showNotification('현재 비밀번호를 입력하세요.', 'error');
            return;
        }
        
        if (settingsData.newPassword !== settingsData.confirmPassword) {
            showNotification('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.', 'error');
            return;
        }
        
        if (settingsData.newPassword.length < 8) {
            showNotification('비밀번호는 8자 이상이어야 합니다.', 'error');
            return;
        }
    }
    
    // 사이트 설정 유효성 검사
    if (!settingsData.siteTitle) {
        showNotification('사이트 제목은 필수입니다.', 'error');
        return;
    }
    
    if (!settingsData.contactEmail) {
        showNotification('연락처 이메일은 필수입니다.', 'error');
        return;
    }
    
    if (!emailPattern.test(settingsData.contactEmail)) {
        showNotification('유효한 연락처 이메일 주소를 입력하세요.', 'error');
        return;
    }
    
    // API 호출 (백엔드 연동 시 활성화)
    /*
    apiRequest('/api/admin/settings', {
        method: 'PUT',
        body: JSON.stringify(settingsData)
    })
    .then(data => {
        showNotification('설정이 성공적으로 저장되었습니다.');
        
        // 사용자 이름 업데이트
        document.getElementById('admin-username').textContent = settingsData.name;
        
        // 비밀번호 필드 초기화
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
        
        // 로컬 스토리지 사용자 이름 업데이트
        localStorage.setItem('adminUsername', settingsData.name);
    })
    .catch(error => {
        console.error('설정 저장 오류:', error);
        showNotification('설정을 저장하는 중 오류가 발생했습니다.', 'error');
    });
    */
    
    // 데모용 처리
    showNotification('설정이 성공적으로 저장되었습니다.');
    
    // 사용자 이름 업데이트
    const usernameElement = document.getElementById('admin-username');
    if (usernameElement) {
        usernameElement.textContent = settingsData.name;
    }
    
    // 비밀번호 필드 초기화
    const currentPasswordField = document.getElementById('current-password');
    const newPasswordField = document.getElementById('new-password');
    const confirmPasswordField = document.getElementById('confirm-password');
    
    if (currentPasswordField) currentPasswordField.value = '';
    if (newPasswordField) newPasswordField.value = '';
    if (confirmPasswordField) confirmPasswordField.value = '';
    
    // 로컬 스토리지 사용자 이름 업데이트
    localStorage.setItem('adminUsername', settingsData.name);
}

// 폼 값 가져오기 헬퍼 함수
function getFormValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : '';
}
