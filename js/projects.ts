/**
 * Module for loading and displaying project data
 */

// Project interface
interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    demoLink: string;
    codeLink: string;
}

// Game interfaces
interface Game {
    title: string;
    description: string;
    features: string[];
    image: string;
    trailerLink: string;
    devProcessLink: string;
    gameplayVideo?: string;
}

interface GamesData {
    featuredGame: Game | null;
    otherGames: Game[];
}

// Skill interfaces
interface Skill {
    name: string;
    level: number;
}

interface SkillCategory {
    name: string;
    skills: Skill[];
}

// Load project data
async function loadProjects(): Promise<Project[]> {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) {
            throw new Error('Failed to load project data.');
        }
        const data = await response.json();
        return data.projects;
    } catch (error) {
        console.error('Project loading error:', error);
        return [];
    }
}

// Load game data
async function loadGames(): Promise<GamesData> {
    try {
        const response = await fetch('data/games.json');
        if (!response.ok) {
            throw new Error('Failed to load game data.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Game loading error:', error);
        return { featuredGame: null, otherGames: [] };
    }
}

// Load skill stack data
async function loadSkills(): Promise<SkillCategory[]> {
    try {
        const response = await fetch('data/skills.json');
        if (!response.ok) {
            throw new Error('Failed to load skill stack data.');
        }
        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.error('Skill stack loading error:', error);
        return [];
    }
}

// Generate project HTML
function createProjectHTML(project: Project): string {
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
                    <a href="${project.demoLink}" class="project-btn">Play Game</a>
                    <a href="${project.codeLink}" class="project-btn secondary">Source Code</a>
                </div>
            </div>
        </div>
    `;
}

// Render projects section
async function renderProjects(): Promise<void> {
    const projectsContainer = document.querySelector('.projects-grid');
    if (!projectsContainer) return;
    
    const projects = await loadProjects();
    
    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p>No projects to display.</p>';
        return;
    }
    
    projectsContainer.innerHTML = projects.map(project => createProjectHTML(project)).join('');
}

// Render featured game
async function renderFeaturedGame(): Promise<void> {
    const featuredGameContainer = document.querySelector('.featured-game');
    if (!featuredGameContainer) return;
    
    const gamesData = await loadGames();
    const game = gamesData.featuredGame;
    
    if (!game) {
        featuredGameContainer.innerHTML = '<p>No featured game to display.</p>';
        return;
    }
    
    featuredGameContainer.innerHTML = `
        <div class="featured-game-info">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <p>Key Features:</p>
            <ul>
                ${game.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div class="project-actions">
                <a href="${game.trailerLink}" class="project-btn">Watch Game Trailer</a>
                <a href="${game.devProcessLink}" class="project-btn secondary">View Development Process</a>
            </div>
        </div>
        <div class="featured-game-image">
            <img src="${game.image}" alt="${game.title}" onerror="this.src='images/games/placeholder.jpg'">
        </div>
    `;
    
    // Render gameplay video
    const gameVideoContainer = document.querySelector('.game-video');
    if (gameVideoContainer && game.gameplayVideo) {
        gameVideoContainer.innerHTML = `
            <video controls>
                <source src="${game.gameplayVideo}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    }
}

// Render skills stack
async function renderSkills(): Promise<void> {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;
    
    const skillCategories = await loadSkills();
    
    if (skillCategories.length === 0) {
        skillsContainer.innerHTML = '<p>No skills to display.</p>';
        return;
    }
    
    skillsContainer.innerHTML = skillCategories.map((category: SkillCategory) => `
        <div class="skill-category">
            <h3>${category.name}</h3>
            <ul class="skill-list">
                ${category.skills.map((skill: Skill) => `
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

// Execute when document is loaded
document.addEventListener('DOMContentLoaded', (): void => {
    renderProjects();
    renderFeaturedGame();
    renderSkills();
});