/**
 * 프로젝트, 게임, 기술 렌더링 관련 기능을 담당하는 모듈
 */

import { loadProjects, loadGames, loadSkills } from './dataLoader.js';

// 프로젝트 HTML 생성
function createProjectHTML(project) {
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

// 모든 컨텐츠 렌더링 초기화
function initRenderers() {
    renderProjects();
    renderFeaturedGame();
    renderSkills();
}

export { initRenderers };
