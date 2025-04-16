/**
 * 프로젝트, 게임, 기술 렌더링 관련 기능을 담당하는 모듈
 */

import { loadProjects, loadGames, loadSkills, loadWorkExperience } from './dataLoader.js';

// 프로젝트 HTML 생성
function createProjectHTML(project) {
    // 추가 이미지가 있는지 확인
    const hasAdditionalImages = project.additionalImages && project.additionalImages.length > 0;
    
    // 추가 이미지 HTML 생성
    const additionalImagesHTML = hasAdditionalImages ? `
        <div class="project-additional-images">
            <h4>Additional Images</h4>
            <div class="project-gallery">
                ${project.additionalImages.map(imgSrc => `
                    <div class="gallery-item">
                        <img src="${imgSrc}" alt="${project.title} Additional" onerror="this.parentElement.style.display='none'">
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';
    
    return `
        <div class="project-card" id="project-${project.id}">
            <div class="project-image">
                <div class="project-image-overlay">
                    <div class="project-actions">
                        <a href="${project.demoLink}" class="project-btn">Experience</a>
                        <a href="${project.codeLink}" class="project-btn secondary">GitHub Repo</a>
                    </div>
                </div>
                <img src="${project.image}" alt="${project.title}" onerror="this.src='images/projects/placeholder.jpg'">
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                ${additionalImagesHTML}
            </div>
        </div>
    `;
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
}

// 대표작 게임 렌더링
async function renderFeaturedGame() {
    const featuredGameContainer = document.querySelector('.featured-game');
    if (!featuredGameContainer) return;
    
    const gamesData = await loadGames();
    const game = gamesData.featuredGame;
    
    if (!game) {
        featuredGameContainer.innerHTML = '<p>표시할 대표작이 없습니다.</p>';
        return;
    }
    
    featuredGameContainer.innerHTML = `
        <div class="featured-game-image">
            <img src="${game.image}" alt="${game.title}" onerror="this.src='images/games/placeholder.jpg'">
        </div>
        <div class="featured-game-info">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <div class="featured-game-details">
                <h4>Key Features</h4>
                <ul class="feature-list">
                    ${game.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="featured-game-actions">
                <a href="${game.demoLink}" class="btn btn-primary">Experience</a>
                <a href="${game.caseStudyLink}" class="btn btn-secondary">Case Study</a>
            </div>
        </div>
    `;
    
    // 게임플레이 영상 렌더링
    const gameVideoContainer = document.querySelector('.game-video');
    if (gameVideoContainer && game.gameplayVideo) {
        gameVideoContainer.innerHTML = `
            <video controls>
                <source src="${game.gameplayVideo}" type="video/mp4">
                브라우저가 비디오 태그를 지원하지 않습니다.
            </video>
        `;
    } else if (gameVideoContainer) {
        gameVideoContainer.innerHTML = `
            <div class="game-video-placeholder">Video Content</div>
        `;
    }
}

// 기술 스택 렌더링
async function renderSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;
    
    const skillCategories = await loadSkills();
    
    if (skillCategories.length === 0) {
        skillsContainer.innerHTML = '<p>표시할 기술 스택이 없습니다.</p>';
        return;
    }
    
    skillsContainer.innerHTML = skillCategories.map(category => `
        <div class="skill-category">
            <div class="skill-category-header">
                <i class="fas fa-${category.icon}"></i>
                <h3>${category.name}</h3>
            </div>
            <ul class="skill-list">
                ${category.skills.map(skill => `
                    <li class="skill-item">
                        <span class="skill-name">${skill.name}</span>
                        <div class="skill-bar">
                            <div class="skill-level" style="width: ${skill.level}%;">
                                <span class="skill-percent">${skill.level}%</span>
                            </div>
                        </div>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

// 회사 경력 렌더링
async function renderWorkExperience() {
    const workExpContainer = document.querySelector('.work-exp-timeline');
    if (!workExpContainer) return;
    
    const companies = await loadWorkExperience();
    
    if (companies.length === 0) {
        workExpContainer.innerHTML = '<p>표시할 회사 경력이 없습니다.</p>';
        return;
    }
    
    workExpContainer.innerHTML = companies.map(company => `
        <div class="work-exp-item">
            <div class="work-exp-company">
                <h3>${company.name}</h3>
                <span class="work-exp-date">${company.period}</span>
            </div>
            
            <div class="work-exp-projects">
                ${company.projects.map(project => `
                    <div class="work-project">
                        <div class="work-project-header">
                            <h4>${project.title}</h4>
                            <div class="work-project-tags">
                                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                        <div class="work-project-content">
                            <div class="work-project-image">
                                <img src="${project.image}" alt="${project.title}" onerror="this.src='images/projects/placeholder.jpg'">
                            </div>
                            <div class="work-project-description">
                                <h5>Role: ${project.role}</h5>
                                <ul class="feature-list">
                                    ${project.responsibilities.map(resp => `<li><i class="fas fa-check"></i> ${resp}</li>`).join('')}
                                </ul>
                                <div class="work-project-notes">
                                    <p><strong>Note:</strong> ${project.note}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 모든 컨텐츠 렌더링 초기화
function initRenderers() {
    renderProjects();
    renderFeaturedGame();
    renderSkills();
    renderWorkExperience();
}

export { initRenderers };
