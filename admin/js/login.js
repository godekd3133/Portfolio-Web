// 관리자 로그인 스크립트
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    
    // 이미 로그인되어 있는지 확인
    checkAuthentication();
    
    // 로그인 폼 제출 처리
    loginForm.addEventListener('submit', handleLogin);
    
    // 로그인 처리 함수
    async function handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // 입력 검증
        if (!username || !password) {
            showError('사용자명과 비밀번호를 모두 입력하세요.');
            return;
        }
        
        try {
            // 로그인 API 호출 (백엔드 연동 시 활성화)
            /*
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || '로그인에 실패했습니다.');
            }
            
            // 토큰 저장
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminUsername', data.user.name);
            */
            
            // 임시 로그인 처리 (데모용, 실제 구현 시 위의 API 호출로 대체)
            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('adminToken', 'demo-token-12345');
                localStorage.setItem('adminUsername', '김민규');
                
                // 대시보드로 리디렉션
                window.location.href = 'index.html';
            } else {
                showError('사용자명 또는 비밀번호가 잘못되었습니다.');
            }
        } catch (error) {
            showError(error.message || '로그인 처리 중 오류가 발생했습니다.');
            console.error('로그인 오류:', error);
        }
    }
    
    // 에러 메시지 표시
    function showError(message) {
        loginError.textContent = message;
        loginError.style.display = 'block';
        
        // 3초 후 메시지 숨김
        setTimeout(() => {
            loginError.style.display = 'none';
        }, 3000);
    }
    
    // 인증 상태 확인
    function checkAuthentication() {
        const token = localStorage.getItem('adminToken');
        
        if (token) {
            // 토큰 검증 (백엔드 연동 시 활성화)
            /*
            fetch('/api/auth/verify', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = 'index.html';
                } else {
                    // 유효하지 않은 토큰이면 제거
                    localStorage.removeItem('adminToken');
                    localStorage.removeItem('adminUsername');
                }
            })
            .catch(error => {
                console.error('토큰 검증 오류:', error);
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUsername');
            });
            */
            
            // 임시 검증 (데모용, 실제 구현 시 위의 API 호출로 대체)
            window.location.href = 'index.html';
        }
    }
});