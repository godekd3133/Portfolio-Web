// 프로젝트 목록 관리 모듈

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
    
    // 임시 데이터 (데모용)
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
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);
    
    renderProjects(paginatedProjects);
    updatePagination(page, totalPages);
}

// 프로젝트 렌더링 함수
function renderProjects(projects) {
    const tableBody = document.getElementById('projects-table');
    
    if (!tableBody) {
        console.error('projects-table 요소를 찾을 수 없습니다.');
        return;
    }
    
    if (projects.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="text-center">프로젝트가 없습니다.</td></tr>';
        return;
    }
    
    let html = '';
    
    projects.forEach(project => {
        const date = new Date(project.createdAt).toLocaleDateString('ko-KR');
        const featured = project.featured ? 
            '<span class="status-badge status-featured">추천</span>' : 
            '<span class="status-badge status-active">일반</span>';
        const tags = project.tags.join(', ');
        
        html += `
            <tr>
                <td>${project._id}</td>
                <td>
                    <img src="${project.imageUrl}" alt="${project.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                </td>
                <td>${project.title}</td>
                <td>${tags}</td>
                <td>${featured}</td>
                <td>${date}</td>
                <td>
                    <button class="action-btn view-btn" data-id="${project._id}" title="상세 보기">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" data-id="${project._id}" title="수정">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" data-id="${project._id}" title="삭제">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
    
    // 작업 버튼 이벤트 연결
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-id');
            showProjectModal(projectId);
        });
    });
    
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-id');
            editProject(projectId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-id');
            confirmDeleteProject(projectId);
        });
    });
}

// 페이지네이션 업데이트 함수
function updatePagination(currentPage, totalPages) {
    const currentPageEl = document.getElementById('current-page');
    const totalPagesEl = document.getElementById('total-pages');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    
    if (currentPageEl) currentPageEl.textContent = currentPage;
    if (totalPagesEl) totalPagesEl.textContent = totalPages;
    
    // 이전/다음 버튼 활성화/비활성화
    if (prevPageBtn) prevPageBtn.disabled = currentPage <= 1;
    if (nextPageBtn) nextPageBtn.disabled = currentPage >= totalPages;
}
