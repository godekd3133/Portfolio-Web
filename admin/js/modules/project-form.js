// 프로젝트 추가/수정 모듈

// 프로젝트 추가 폼 초기화 함수
function initAddProject() {
    // 파일 업로드 처리
    initFileUpload();
    
    // 스크린샷 업로드 처리
    initScreenshotsUpload();
    
    // 폼 제출 처리
    const projectForm = document.getElementById('project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', handleProjectSubmit);
        
        // 폼 초기화 버튼
        projectForm.addEventListener('reset', () => {
            // 이미지 미리보기 초기화
            const imagePreview = document.getElementById('image-preview');
            if (imagePreview) {
                imagePreview.innerHTML = '';
            }
            
            // 스크린샷 미리보기 초기화
            const screenshotsPreview = document.getElementById('screenshots-preview');
            if (screenshotsPreview) {
                screenshotsPreview.innerHTML = '';
            }
            
            // 파일명 표시 초기화
            const fileName = document.getElementById('file-name');
            if (fileName) {
                fileName.textContent = '선택된 파일 없음';
            }
            
            const screenshotsCount = document.getElementById('screenshots-count');
            if (screenshotsCount) {
                screenshotsCount.textContent = '선택된 파일 없음';
            }
            
            // 폼 제목 복원
            const addProjectTitle = document.querySelector('.admin-title h1');
            if (addProjectTitle) {
                addProjectTitle.textContent = '프로젝트 추가';
            }
            
            // 프로젝트 ID 제거
            projectForm.removeAttribute('data-id');
        });
    }
}

// 파일 업로드 초기화 함수
function initFileUpload() {
    const projectImage = document.getElementById('project-image');
    const fileName = document.getElementById('file-name');
    const imagePreview = document.getElementById('image-preview');
    
    if (!projectImage || !fileName || !imagePreview) {
        return;
    }
    
    projectImage.addEventListener('change', (e) => {
        const file = e.target.files[0];
        
        if (file) {
            fileName.textContent = file.name;
            
            // 이미지 미리보기
            const reader = new FileReader();
            reader.onload = (event) => {
                imagePreview.innerHTML = `<img src="${event.target.result}" alt="이미지 미리보기">`;
            };
            reader.readAsDataURL(file);
        } else {
            fileName.textContent = '선택된 파일 없음';
            imagePreview.innerHTML = '';
        }
    });
}

// 스크린샷 업로드 초기화 함수
function initScreenshotsUpload() {
    const projectScreenshots = document.getElementById('project-screenshots');
    const screenshotsCount = document.getElementById('screenshots-count');
    const screenshotsPreview = document.getElementById('screenshots-preview');
    
    if (!projectScreenshots || !screenshotsCount || !screenshotsPreview) {
        return;
    }
    
    projectScreenshots.addEventListener('change', (e) => {
        const files = e.target.files;
        
        if (files.length > 0) {
            screenshotsCount.textContent = `${files.length}개 파일 선택됨`;
            
            // 미리보기 초기화
            screenshotsPreview.innerHTML = '';
            
            // 각 파일에 대한 미리보기 생성
            Array.from(files).forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const screenshotItem = document.createElement('div');
                    screenshotItem.className = 'screenshot-item';
                    screenshotItem.innerHTML = `
                        <img src="${event.target.result}" alt="스크린샷 ${index + 1}">
                        <button type="button" class="remove-screenshot" data-index="${index}">&times;</button>
                    `;
                    screenshotsPreview.appendChild(screenshotItem);
                    
                    // 삭제 버튼 이벤트
                    screenshotItem.querySelector('.remove-screenshot').addEventListener('click', () => {
                        screenshotItem.remove();
                        
                        // 선택된 파일 카운트 업데이트
                        const remainingItems = screenshotsPreview.querySelectorAll('.screenshot-item').length;
                        if (remainingItems === 0) {
                            screenshotsCount.textContent = '선택된 파일 없음';
                        } else {
                            screenshotsCount.textContent = `${remainingItems}개 파일 선택됨`;
                        }
                    });
                };
                reader.readAsDataURL(file);
            });
        } else {
            screenshotsCount.textContent = '선택된 파일 없음';
            screenshotsPreview.innerHTML = '';
        }
    });
}

// 프로젝트 폼 제출 처리 함수
function handleProjectSubmit(e) {
    e.preventDefault();
    
    // 폼 데이터 수집
    const form = e.target;
    const projectId = form.getAttribute('data-id');
    const isEdit = !!projectId;
    
    const projectData = {
        title: form.querySelector('#project-title').value,
        description: form.querySelector('#project-description').value,
        tags: form.querySelector('#project-tags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
        featured: form.querySelector('#project-featured').checked,
        order: parseInt(form.querySelector('#project-order').value) || 0,
        gameUrl: form.querySelector('#project-demo').value,
        sourceCodeUrl: form.querySelector('#project-github').value
    };
    
    // 유효성 검사
    if (!projectData.title) {
        showNotification('프로젝트 제목은 필수입니다.', 'error');
        return;
    }
    
    if (!projectData.description) {
        showNotification('프로젝트 설명은 필수입니다.', 'error');
        return;
    }
    
    // 파일 업로드 처리 (실제 구현에서는 FormData 사용)
    const imageFile = form.querySelector('#project-image').files[0];
    const screenshotFiles = form.querySelector('#project-screenshots').files;
    
    // 이미지 파일 필수 (수정 시 제외)
    if (!isEdit && !imageFile) {
        showNotification('프로젝트 이미지는 필수입니다.', 'error');
        return;
    }
    
    // API 호출 (백엔드 연동 시 활성화)
    /*
    const formData = new FormData();
    
    // 프로젝트 데이터 추가
    Object.entries(projectData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(item => formData.append(`${key}[]`, item));
        } else if (value !== null && value !== undefined) {
            formData.append(key, value);
        }
    });
    
    // 파일 추가
    if (imageFile) {
        formData.append('imageFile', imageFile);
    }
    
    Array.from(screenshotFiles).forEach((file, index) => {
        formData.append(`screenshotFiles`, file);
    });
    
    const url = isEdit ? `/api/projects/${projectId}` : '/api/projects';
    const method = isEdit ? 'PUT' : 'POST';
    
    fetch(url, {
        method,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showNotification(`프로젝트가 성공적으로 ${isEdit ? '수정' : '추가'}되었습니다.`);
            
            // 폼 초기화
            form.reset();
            
            // 프로젝트 목록 탭으로 이동
            const projectsTab = document.querySelector('a[data-section="projects"]');
            if (projectsTab) {
                projectsTab.click();
            }
            
            // 프로젝트 목록 새로고침
            loadProjects();
        } else {
            showNotification(`프로젝트 ${isEdit ? '수정' : '추가'} 중 오류가 발생했습니다: ${data.error}`, 'error');
        }
    })
    .catch(error => {
        console.error(`프로젝트 ${isEdit ? '수정' : '추가'} 오류:`, error);
        showNotification(`프로젝트 ${isEdit ? '수정' : '추가'} 중 오류가 발생했습니다.`, 'error');
    });
    */
    
    // 데모용 처리
    showNotification(`프로젝트가 성공적으로 ${isEdit ? '수정' : '추가'}되었습니다.`);
    
    // 폼 초기화
    form.reset();
    
    // 이미지 미리보기 초기화
    const imagePreview = document.getElementById('image-preview');
    if (imagePreview) {
        imagePreview.innerHTML = '';
    }
    
    // 스크린샷 미리보기 초기화
    const screenshotsPreview = document.getElementById('screenshots-preview');
    if (screenshotsPreview) {
        screenshotsPreview.innerHTML = '';
    }
    
    // 프로젝트 목록 탭으로 이동
    const projectsTab = document.querySelector('a[data-section="projects"]');
    if (projectsTab) {
        projectsTab.click();
    }
    
    // 프로젝트 ID 제거
    form.removeAttribute('data-id');
    
    // 폼 제목 복원
    const addProjectTitle = document.querySelector('.admin-title h1');
    if (addProjectTitle) {
        addProjectTitle.textContent = '프로젝트 추가';
    }
    
    // 프로젝트 목록 새로고침
    loadProjects();
}
