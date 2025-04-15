/**
 * 프로젝트 렌더링 모듈
 */

import { loadProjects } from '../utils/dataLoader.js';

// 프로젝트 HTML 생성
function createProjectHTML(project) {
    return `
        <div class="project-card" id="project-${project.id}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='assets/images/projects/placeholder.jpg'">
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <a href="${project.demoLink}" class="project-btn">게임 플레이</a>
                    <a href="${project.codeLink}" class="project-btn secondary">소스 코드</a>
                </div>
            </div>
        </div>
    `;
}

// 프로젝트 카드 애니메이션 초기화
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        });
    });
}

// 프로젝트 섹션 렌더링
async function renderProjects() {
    const projectsContainer = document.querySelector('.projects-grid');
    if (!projectsContainer) return;
    
    const projects = await loadProjects();
    
    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p>표시할 프로젝트가 없습니다.</p>';
        return;
    }
    
    projectsContainer.innerHTML = projects.map(project => createProjectHTML(project)).join('');
    
    // 애니메이션 설정
    initProjectCards();
}

export { renderProjects };