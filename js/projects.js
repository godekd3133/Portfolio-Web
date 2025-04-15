/**
 * 프로젝트 데이터를 로드하고 표시하는 모듈
 */

// 프로젝트 데이터 로드
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) {
            throw new Error('프로젝트 데이터를 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        return data.projects;
    } catch (error) {
        console.error('프로젝트 로드 에러:', error);
        return [];
    }
}

// 게임 데이터 로드
async function loadGames() {
    try {
        const response = await fetch('data/games.json');
        if (!response.ok) {
            throw new Error('게임 데이터를 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('게임 로드 에러:', error);
        return { featuredGame: null, otherGames: [] };
    }
}

// 기술 스택 데이터 로드
async function loadSkills() {
    try {
        const response = await fetch('data/skills.json');
        if (!response.ok) {
            throw new Error('기술 스택 데이터를 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.error('기술 스택 로드 에러:', error);
        return [];
    }
}

// 프로젝트 HTML 생성
function createProjectHTML(project) {
    return `
        <div class="project-card" id="project-${project.id}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='images/projects/placeholder.jpg'">
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
        <div class="featured-game-info">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <p>주요 기능:</p>
            <ul>
                ${game.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div class="project-actions">
                <a href="${game.trailerLink}" class="project-btn">게임 트레일러 보기</a>
                <a href="${game.devProcessLink}" class="project-btn secondary">개발 과정 보기</a>
            </div>
        </div>
        <div class="featured-game-image">
            <img src="${game.image}" alt="${game.title}" onerror="this.src='images/games/placeholder.jpg'">
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
            <h3>${category.name}</h3>
            <ul class="skill-list">
                ${category.skills.map(skill => `
                    <li class="skill-item">
                        <span class="skill-name">${skill.name}</span>
                        <div class="skill-bar">
                            <div class="skill-level" style="width: ${skill.level}%;"></div>
                        </div>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

// 문서가 로드되면 실행
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderFeaturedGame();
    renderSkills();
});
