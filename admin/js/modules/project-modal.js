// 프로젝트 상세 모달 모듈

// 프로젝트 상세 모달 초기화 함수
function initProjectModal() {
    // 모달 닫기 버튼
    const closeModalBtn = document.querySelector('#project-modal .close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            document.getElementById('project-modal').style.display = 'none';
        });
    }
    
    // 수정 버튼
    const editProjectBtn = document.getElementById('edit-project-btn');
    if (editProjectBtn) {
        editProjectBtn.addEventListener('click', () => {
            const projectId = document.getElementById('project-modal').getAttribute('data-id');
            document.getElementById('project-modal').style.display = 'none';
            editProject(projectId);
        });
    }
    
    // 삭제 버튼
    const deleteProjectBtn = document.getElementById('delete-project-btn');
    if (deleteProjectBtn) {
        deleteProjectBtn.addEventListener('click', () => {
            const projectId = document.getElementById('project-modal').getAttribute('data-id');
            document.getElementById('project-modal').style.display = 'none';
            confirmDeleteProject(projectId);
        });
    }
}

// 프로젝트 상세 모달 표시 함수
function showProjectModal(projectId) {
    // 임시 데이터 (데모용)
    const demoProjects = {
        '1': { 
            _id: '1', 
            title: '3D 액션 게임', 
            description: '다양한 무기와 스킬을 활용하는 3인칭 액션 게임입니다. 화려한 콤보 시스템과 다양한 적 캐릭터가 특징입니다.',
            imageUrl: '../images/projects/game1.jpg', 
            tags: ['Unity', '3D', 'Action'], 
            featured: true, 
            order: 1,
            gameUrl: 'https://example.com/game1',
            sourceCodeUrl: 'https://github.com/username/game1',
            createdAt: '2025-04-10T09:30:00'
        },
        '2': { 
            _id: '2', 
            title: '퍼즐 어드벤처', 
            description: '아름다운 그래픽과 흥미로운 스토리를 갖춘 2D 퍼즐 게임입니다. 다양한 레벨과 퍼즐 요소를 포함하고 있습니다.',
            imageUrl: '../images/projects/game2.jpg', 
            tags: ['Unity', '2D', 'Puzzle'], 
            featured: false, 
            order: 2,
            gameUrl: 'https://example.com/game2',
            sourceCodeUrl: 'https://github.com/username/game2',
            createdAt: '2025-04-05T14:45:00'
        },
        '3': { 
            _id: '3', 
            title: '전략 시뮬레이션', 
            description: '다양한 유닛과 전략적 요소를 갖춘 턴제 전략 게임입니다. 멀티플레이어 모드를 지원합니다.',
            imageUrl: '../images/projects/game3.jpg', 
            tags: ['Unreal', '3D', 'Strategy'], 
            featured: true, 
            order: 3,
            gameUrl: 'https://example.com/game3',
            sourceCodeUrl: null,
            createdAt: '2025-03-28T11:20:00'
        },
        '4': { 
            _id: '4', 
            title: '캐주얼 모바일 게임', 
            description: '간단한 조작으로 즐길 수 있는 모바일 캐주얼 게임입니다. 다양한 스테이지와 점수 시스템을 갖추고 있습니다.',
            imageUrl: '../images/projects/game4.jpg', 
            tags: ['Unity', '2D', 'Mobile'], 
            featured: false, 
            order: 4,
            gameUrl: 'https://play.google.com/store/example',
            sourceCodeUrl: null,
            createdAt: '2025-03-15T10:10:00'
        },
        '5': { 
            _id: '5', 
            title: 'VR 체험 게임', 
            description: '실감나는 VR 체험을 제공하는 몰입형 게임입니다. 다양한 인터랙션과 VR 환경을 탐험할 수 있습니다.',
            imageUrl: '../images/projects/game5.jpg', 
            tags: ['Unreal', 'VR', '3D'], 
            featured: true, 
            order: 5,
            gameUrl: 'https://example.com/game5',
            sourceCodeUrl: 'https://github.com/username/game5',
            createdAt: '2025-03-05T16:55:00'
        }
    };
    
    const project = demoProjects[projectId];
    
    if (!project) {
        showNotification('프로젝트를 찾을 수 없습니다.', 'error');
        return;
    }
    
    renderProjectDetails(project);
    document.getElementById('project-modal').setAttribute('data-id', projectId);
    document.getElementById('project-modal').style.display = 'flex';
}

// 프로젝트 상세 정보 렌더링 함수
function renderProjectDetails(project) {
    const modalTitle = document.getElementById('project-modal-title');
    const modalBody = document.getElementById('project-modal-body');
    
    if (!modalTitle || !modalBody) {
        console.error('프로젝트 모달 요소를 찾을 수 없습니다.');
        return;
    }
    
    modalTitle.textContent = project.title;
    
    const date = new Date(project.createdAt).toLocaleDateString('ko-KR');
    const featured = project.featured ? 
        '<span class="status-badge status-featured">추천</span>' : 
        '<span class="status-badge status-active">일반</span>';
    const tags = project.tags.join(', ');
    
    const gameUrlSection = project.gameUrl ? 
        `<p><strong>게임 URL:</strong> <a href="${project.gameUrl}" target="_blank">${project.gameUrl}</a></p>` : 
        '';
    
    const sourceCodeSection = project.sourceCodeUrl ? 
        `<p><strong>소스 코드:</strong> <a href="${project.sourceCodeUrl}" target="_blank">${project.sourceCodeUrl}</a></p>` : 
        '';
    
    modalBody.innerHTML = `
        <div class="project-detail">
            <div class="project-image">
                <img src="${project.imageUrl}" alt="${project.title}">
            </div>
            <div class="project-info">
                <div class="project-meta">
                    <p><strong>상태:</strong> ${featured}</p>
                    <p><strong>태그:</strong> ${tags}</p>
                    <p><strong>생성일:</strong> ${date}</p>
                    <p><strong>순서:</strong> ${project.order}</p>
                    ${gameUrlSection}
                    ${sourceCodeSection}
                </div>
                <div class="project-description">
                    <h3>프로젝트 설명</h3>
                    <p>${project.description}</p>
                </div>
            </div>
        </div>
    `;
}

// 프로젝트 삭제 확인 창 표시 함수
function confirmDeleteProject(projectId) {
    const confirmMessage = document.getElementById('confirm-message');
    const confirmActionBtn = document.getElementById('confirm-action-btn');
    const confirmModal = document.getElementById('confirm-modal');
    
    if (!confirmMessage || !confirmActionBtn || !confirmModal) {
        console.error('확인 모달 요소를 찾을 수 없습니다.');
        return;
    }
    
    confirmMessage.textContent = '이 프로젝트를 영구적으로 삭제하시겠습니까?';
    
    // 이전 이벤트 리스너 제거
    const newConfirmBtn = confirmActionBtn.cloneNode(true);
    confirmActionBtn.parentNode.replaceChild(newConfirmBtn, confirmActionBtn);
    
    // 새 이벤트 리스너 추가
    newConfirmBtn.addEventListener('click', () => {
        deleteProject(projectId);
        confirmModal.style.display = 'none';
    });
    
    confirmModal.style.display = 'flex';
}

// 프로젝트 삭제 함수
function deleteProject(projectId) {
    // 실제 구현에서는 API 호출로 대체
    console.log(`프로젝트 ID ${projectId} 삭제 요청`);
    
    // 삭제 후 목록 새로고침
    loadProjects();
    
    // 성공 메시지 표시
    showNotification('프로젝트가 성공적으로 삭제되었습니다.');
}

// 프로젝트 수정 함수
function editProject(projectId) {
    // 임시 데이터 (데모용)
    const demoProjects = {
        '1': { 
            _id: '1', 
            title: '3D 액션 게임', 
            description: '다양한 무기와 스킬을 활용하는 3인칭 액션 게임입니다. 화려한 콤보 시스템과 다양한 적 캐릭터가 특징입니다.',
            imageUrl: '../images/projects/game1.jpg', 
            tags: ['Unity', '3D', 'Action'], 
            featured: true, 
            order: 1,
            gameUrl: 'https://example.com/game1',
            sourceCodeUrl: 'https://github.com/username/game1',
            createdAt: '2025-04-10T09:30:00'
        },
        '2': { 
            _id: '2', 
            title: '퍼즐 어드벤처', 
            description: '아름다운 그래픽과 흥미로운 스토리를 갖춘 2D 퍼즐 게임입니다. 다양한 레벨과 퍼즐 요소를 포함하고 있습니다.',
            imageUrl: '../images/projects/game2.jpg', 
            tags: ['Unity', '2D', 'Puzzle'], 
            featured: false, 
            order: 2,
            gameUrl: 'https://example.com/game2',
            sourceCodeUrl: 'https://github.com/username/game2',
            createdAt: '2025-04-05T14:45:00'
        }
    };
    
    const project = demoProjects[projectId];
    
    if (!project) {
        showNotification('프로젝트를 찾을 수 없습니다.', 'error');
        return;
    }
    
    // 프로젝트 추가 탭으로 이동
    const addProjectTab = document.querySelector('a[data-section="add-project"]');
    if (addProjectTab) {
        addProjectTab.click();
    }
    
    // 폼에 데이터 채우기
    fillProjectForm(project);
}

// 프로젝트 폼에 데이터 채우기
function fillProjectForm(project) {
    document.getElementById('project-title').value = project.title;
    document.getElementById('project-description').value = project.description;
    
    // 이미지 미리보기
    const imagePreview = document.getElementById('image-preview');
    if (imagePreview) {
        imagePreview.innerHTML = `<img src="${project.imageUrl}" alt="${project.title}">`;
    }
    
    // 태그
    document.getElementById('project-tags').value = project.tags.join(', ');
    
    // 링크
    if (project.gameUrl) {
        document.getElementById('project-demo').value = project.gameUrl;
    }
    if (project.sourceCodeUrl) {
        document.getElementById('project-github').value = project.sourceCodeUrl;
    }
    
    // 추천 프로젝트 체크박스
    document.getElementById('project-featured').checked = project.featured;
    
    // 순서
    document.getElementById('project-order').value = project.order;
    
    // 폼 제출 버튼에 프로젝트 ID 추가
    const projectForm = document.getElementById('project-form');
    if (projectForm) {
        projectForm.setAttribute('data-id', project._id);
    }
    
    // 폼 제목 변경
    const addProjectTitle = document.querySelector('.admin-title h1');
    if (addProjectTitle) {
        addProjectTitle.textContent = '프로젝트 수정';
    }
}
