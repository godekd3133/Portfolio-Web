// 관리자 대시보드 - 대시보드 기능 스크립트
document.addEventListener('DOMContentLoaded', () => {
    // 대시보드 초기화
    initDashboard();
});

// 대시보드 초기화 함수
function initDashboard() {
    // 통계 데이터 로드
    loadDashboardStats();
    
    // 최근 프로젝트 및 메시지 로드
    loadRecentProjects();
    loadRecentMessages();
}

// 대시보드 통계 로드 함수
function loadDashboardStats() {
    // API 호출 (백엔드 연동 시 활성화)
    /*
    apiRequest('/api/admin/stats')
        .then(data => {
            document.getElementById('total-projects').textContent = data.totalProjects;
            document.getElementById('featured-projects').textContent = data.featuredProjects;
            document.getElementById('new-messages').textContent = data.newMessages;
            document.getElementById('page-views').textContent = data.pageViews;
        })
        .catch(error => {
            console.error('통계 로드 오류:', error);
            showNotification('통계 데이터를 불러오는 중 오류가 발생했습니다.', 'error');
        });
    */
    
    // 임시 데이터 (데모용, 실제 구현 시 위의 API 호출로 대체)
    document.getElementById('total-projects').textContent = '12';
    document.getElementById('featured-projects').textContent = '5';
    document.getElementById('new-messages').textContent = '3';
    document.getElementById('page-views').textContent = '1,024';
}

// 최근 프로젝트 로드 함수
function loadRecentProjects() {
    // API 호출 (백엔드 연동 시 활성화)
    /*
    apiRequest('/api/projects?limit=5')
        .then(data => {
            renderRecentProjects(data.data);
        })
        .catch(error => {
            console.error('최근 프로젝트 로드 오류:', error);
            renderRecentProjects([]);
            showNotification('최근 프로젝트를 불러오는 중 오류가 발생했습니다.', 'error');
        });
    */
    
    // 임시 데이터 (데모용, 실제 구현 시 위의 API 호출로 대체)
    const demoProjects = [
        { _id: '1', title: '3D 액션 게임', createdAt: '2025-04-10T09:30:00', featured: true },
        { _id: '2', title: '퍼즐 어드벤처', createdAt: '2025-04-05T14:45:00', featured: false },
        { _id: '3', title: '전략 시뮬레이션', createdAt: '2025-03-28T11:20:00', featured: true },
        { _id: '4', title: '캐주얼 모바일 게임', createdAt: '2025-03-15T10:10:00', featured: false }
    ];
    
    renderRecentProjects(demoProjects);
}

// 최근 프로젝트 렌더링 함수
function renderRecentProjects(projects) {
    const tableBody = document.getElementById('recent-projects-table');
    
    if (!tableBody) {
        console.error('recent-projects-table 요소를 찾을 수 없습니다.');
        return;
    }
    
    if (projects.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3" class="text-center">프로젝트가 없습니다.</td></tr>';
        return;
    }
    
    let html = '';
    
    projects.forEach(project => {
        const date = new Date(project.createdAt).toLocaleDateString('ko-KR');
        const status = project.featured ? 
            '<span class="status-badge status-featured">추천</span>' : 
            '<span class="status-badge status-active">일반</span>';
        
        html += `
            <tr>
                <td>${project.title}</td>
                <td>${date}</td>
                <td>${status}</td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

// 최근 메시지 로드 함수
function loadRecentMessages() {
    // API 호출 (백엔드 연동 시 활성화)
    /*
    apiRequest('/api/messages?limit=5')
        .then(data => {
            renderRecentMessages(data.data);
        })
        .catch(error => {
            console.error('최근 메시지 로드 오류:', error);
            renderRecentMessages([]);
            showNotification('최근 메시지를 불러오는 중 오류가 발생했습니다.', 'error');
        });
    */
    
    // 임시 데이터 (데모용, 실제 구현 시 위의 API 호출로 대체)
    const demoMessages = [
        { _id: '1', name: '김희망', subject: '협업 제안', createdAt: '2025-04-14T09:30:00', read: false },
        { _id: '2', name: '이민준', subject: '취업 문의', createdAt: '2025-04-12T14:45:00', read: false },
        { _id: '3', name: '박서윤', subject: '포트폴리오 피드백', createdAt: '2025-04-10T11:20:00', read: false },
        { _id: '4', name: '최준호', subject: '프로젝트 관련 질문', createdAt: '2025-04-05T10:10:00', read: true }
    ];
    
    renderRecentMessages(demoMessages);
}

// 최근 메시지 렌더링 함수
function renderRecentMessages(messages) {
    const tableBody = document.getElementById('recent-messages-table');
    
    if (!tableBody) {
        console.error('recent-messages-table 요소를 찾을 수 없습니다.');
        return;
    }
    
    if (messages.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3" class="text-center">메시지가 없습니다.</td></tr>';
        return;
    }
    
    let html = '';
    
    messages.forEach(message => {
        const date = new Date(message.createdAt).toLocaleDateString('ko-KR');
        const nameClass = message.read ? '' : 'font-weight-bold';
        
        html += `
            <tr>
                <td class="${nameClass}">${message.name}</td>
                <td>${message.subject}</td>
                <td>${date}</td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}
