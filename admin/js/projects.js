// 관리자 대시보드 - 프로젝트 관리 기능 스크립트
document.addEventListener('DOMContentLoaded', () => {
    // 프로젝트 관리 초기화
    initProjects();
    
    // 프로젝트 추가 폼 초기화
    initAddProject();
});

// 프로젝트 관리 초기화 함수
function initProjects() {
    // 프로젝트 목록 로드
    loadProjects();
    
    // 검색 기능 초기화
    const searchInput = document.getElementById('project-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            loadProjects();
        }, 300));
    }
    
    // 페이지네이션 초기화
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => {
            const currentPage = parseInt(document.getElementById('current-page').textContent);
            if (currentPage > 1) {
                loadProjects(currentPage - 1);
            }
        });
    }
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => {
            const currentPage = parseInt(document.getElementById('current-page').textContent);
            const totalPages = parseInt(document.getElementById('total-pages').textContent);
            if (currentPage < totalPages) {
                loadProjects(currentPage + 1);
            }
        });
    }
    
    // 새 프로젝트 버튼 초기화
    const newProjectBtn = document.getElementById('new-project-btn');
    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', () => {
            // 프로젝트 추가 탭으로 이동
            const addProjectTab = document.querySelector('a[data-section="add-project"]');
            if (addProjectTab) {
                addProjectTab.click();
            }
        });
    }
    
    // 프로젝트 상세 모달 초기화
    initProjectModal();
}

// 프로젝트 목록 로드 함수
function loadProjects(page = 1, limit = 10) {
    const searchInput = document.getElementById('project-search');
    const searchTerm = searchInput ? searchInput.value : '';
    
    // API 호출 (백엔드 연동 시 활성화)
    /*
    apiRequest(`/api/projects?page=${page}&limit=${limit}&search=${searchTerm}`)
        .then(data => {
            renderProjects(data.data);
            updatePagination(page, Math.ceil(data.count / limit));
        })
        .catch(error => {
            console.error('프로젝트 로드 오류:', error);
            renderProjects([]);
            updatePagination(1, 1);
            showNotification('프로젝트를 불러오는 중 오류가 발생했습니다.', 'error');
        });
    */
    
    // 임시 데이터 (데모용, 실제 구현 시 위의 API 호출로 대체)
    const demoProjects = [
        { 
            _id: '1', 
            title: '3D 액션 게임', 
            imageUrl: '../images/projects/game1.jpg', 
            tags: ['Unity', '3D', 'Action'], 
            featured: true, 
            createdAt: '2025-04-10T09:30:00' 
        },
        { 
            _id: '2', 
            title: '퍼즐 어드벤처', 
            imageUrl: '../images/projects/game2.jpg', 
            tags: ['Unity', '2D', 'Puzzle'], 
            featured: false, 
            createdAt: '2025-04-05T14:45:00' 
        },
        { 
            _id: '3', 
            title: '전략 시뮬레이션', 
            imageUrl: '../images/projects/game3.jpg', 
            tags: ['Unreal', '3D', 'Strategy'], 
            featured: true, 
            createdAt: '2025-03-28T11:20:00' 
        },
        { 
            _id: '4', 
            title: '캐주얼 모바일 게임', 
            imageUrl: '../images/projects/game4.jpg', 
            tags: ['Unity', '2D', 'Mobile'], 
            featured: false, 
            createdAt: '2025-03-15T10:10:00' 
        },
        { 
            _id: '5', 
            title: 'VR 체험 게임', 
            imageUrl: '../images/projects/game5.jpg', 
            tags: ['Unreal', 'VR', '3D'], 
            featured: true, 
            createdAt: '2025-03-05T16:55:00' 
        }
    ];
    
    // 검색어가 있으면 필터링
    let filteredProjects = demoProjects;
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredProjects = demoProjects.filter(project => 
            project.title.toLowerCase().includes(term) || 
            project.tags.some(tag => tag.toLowerCase().includes(term))
        );
    }
    
    // 페이지네이션 계산
    const totalProjects = filteredProjects.length;
    const totalPages = Math.ceil(totalProjects / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProjects = filtere