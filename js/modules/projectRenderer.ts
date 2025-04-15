/**
 * Project Renderer Module
 * Handles rendering of projects, games, skills, and work experience
 */

import { loadProjects, loadGames, loadSkills, loadWorkExperience } from './dataLoader';

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

// Game interface
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
    icon?: string; // icon 속성을 선택적(optional)으로 변경
}

// Work experience interfaces
interface WorkProject {
    title: string;
    tags: string[];
    image: string;
    role: string;
    responsibilities: string[];
    note: string;
}

interface Company {
    name: string;
    period: string;
    projects: WorkProject[];
}

interface WorkExperience {
    company: string;
    position: string;
    duration: string;
    description: string;
    achievements: string[];
}

/**
 * Create HTML for a project card
 * @param {Object} project - Project data object
 * @returns {string} HTML string for the project
 */
function createProjectHTML(project: Project): string {
    return `
        <div class="project-card" id="project-${project.id}">
            <div class="project-image">
                <div class="project-image-overlay">
                    <div class="project-actions">
                        <a href="${project.demoLink}" class="project-btn">Experience</a>
                        <a href="${project.codeLink}" class="project-btn secondary">GitHub Repo</a>
                    </div>
                </div>
                <img data-src="${project.image}" alt="${project.title}" class="lazy-image" src="images/placeholder.jpg">
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

/**
 * Create HTML for a game card
 * @param {Object} game - Game data object
 * @returns {string} HTML string for the game
 */
function createGameHTML(game: Game): string {
    return `
        <div class="featured-game-wrapper">
            <div class="featured-game-image">
                <img data-src="${game.image}" alt="${game.title}" class="lazy-image" src="images/placeholder.jpg">
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
                    <a href="${game.trailerLink}" class="btn btn-primary">Experience</a>
                    <a href="${game.devProcessLink}" class="btn btn-secondary">Case Study</a>
                </div>
            </div>
        </div>
    `;
}

/**
 * Create HTML for a skill category
 * @param {Object} category - Skill category data object
 * @returns {string} HTML string for the skill category
 */
function createSkillHTML(category: SkillCategory): string {
    return `
        <div class="skill-category animate-fade-in">
            <div class="skill-category-header">
                ${category.icon ? `<i class="fas fa-${category.icon}"></i>` : ''}
                <h3>${category.name}</h3>
            </div>
            <ul class="skill-list">
                ${category.skills.map((skill, index) => `
                    <li class="skill-item animate-slide-up" style="animation-delay: ${index * 0.1}s">
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
    `;
}

/**
 * Create HTML for a work experience item
 * @param {Object} company - Company data object
 * @returns {string} HTML string for the work experience
 */
function createWorkExperienceHTML(company: Company): string {
    return `
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
                                <img data-src="${project.image}" alt="${project.title}" class="lazy-image" src="images/placeholder.jpg">
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
    `;
}

/**
 * Render projects section
 * @returns {Promise<void>}
 */
async function renderProjects(): Promise<void> {
    const projectsContainer = document.querySelector('.projects-grid');
    if (!projectsContainer) return;

    try {
        const projects = await loadProjects();

        if (projects.length === 0) {
            projectsContainer.innerHTML = '<p class="no-content">No projects to display.</p>';
            return;
        }

        projectsContainer.innerHTML = projects.map(project => createProjectHTML(project)).join('');
    } catch (error) {
        console.error('Error rendering projects:', error);
        projectsContainer.innerHTML = '<p class="error">Failed to load projects.</p>';
    }
}

/**
 * Render featured game section
 * @returns {Promise<void>}
 */
async function renderFeaturedGame(): Promise<void> {
    const featuredGameContainer = document.querySelector('.featured-game');
    if (!featuredGameContainer) return;

    try {
        const gamesData = await loadGames();
        const game = gamesData.featuredGame;

        if (!game) {
            featuredGameContainer.innerHTML = '<p class="no-content">No featured game to display.</p>';
            return;
        }

        featuredGameContainer.innerHTML = createGameHTML(game);

        // Render game video if available
        const gameVideoContainer = document.querySelector('.game-video');
        if (gameVideoContainer && game.gameplayVideo) {
            gameVideoContainer.innerHTML = `
                <video controls preload="none" poster="${game.image}">
                    <source src="${game.gameplayVideo}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        } else if (gameVideoContainer) {
            gameVideoContainer.innerHTML = `
                <div class="game-video-placeholder">Video Content</div>
            `;
        }
    } catch (error) {
        console.error('Error rendering featured game:', error);
        featuredGameContainer.innerHTML = '<p class="error">Failed to load featured game.</p>';
    }
}

/**
 * Render skills section
 * @returns {Promise<void>}
 */
async function renderSkills(): Promise<void> {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;

    try {
        const skillCategories = await loadSkills();

        if (skillCategories.length === 0) {
            skillsContainer.innerHTML = '<p class="no-content">No skills to display.</p>';
            return;
        }

        skillsContainer.innerHTML = skillCategories.map(category =>
            createSkillHTML(category)
        ).join('');
    } catch (error) {
        console.error('Error rendering skills:', error);
        skillsContainer.innerHTML = '<p class="error">Failed to load skills.</p>';
    }
}

/**
 * Render work experience section
 * @returns {Promise<void>}
 */
async function renderWorkExperience(): Promise<void> {
    const workExpContainer = document.querySelector('.work-exp-timeline');
    if (!workExpContainer) return;

    try {
        const workExperiences = await loadWorkExperience();

        if (workExperiences.length === 0) {
            workExpContainer.innerHTML = '<p class="no-content">No work experience to display.</p>';
            return;
        }

        // Transform WorkExperience[] to Company[] for rendering
        const companies = workExperiences.map(exp => {
            return {
                name: exp.company,
                period: exp.duration,
                projects: [{
                    title: exp.position,
                    tags: [], // 필요한 태그 데이터가 없으므로 빈 배열
                    image: '', // 이미지 경로 없음
                    role: exp.position,
                    responsibilities: exp.achievements,
                    note: exp.description
                }]
            } as Company;
        });

        workExpContainer.innerHTML = companies.map(company =>
            createWorkExperienceHTML(company)
        ).join('');
    } catch (error) {
        console.error('Error rendering work experience:', error);
        workExpContainer.innerHTML = '<p class="error">Failed to load work experience.</p>';
    }
}

/**
 * Initialize all content renderers
 * @returns {Promise<void>}
 */
async function initProjectRenderer(): Promise<void> {
    try {
        await Promise.all([
            renderProjects(),
            renderFeaturedGame(),
            renderSkills(),
            renderWorkExperience()
        ]);

        console.log('All content sections rendered successfully');
    } catch (error) {
        console.error('Error initializing renderers:', error);
    }
}

export { initProjectRenderer };