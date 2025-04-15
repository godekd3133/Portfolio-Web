/**
 * Data loading utility module
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

// Config interfaces
interface SiteConfig {
    title?: string;
    author?: string;
    description?: string;
    email?: string;
}

interface NavItem {
    text: string;
    url: string;
}

interface Config {
    site: SiteConfig;
    navigation?: NavItem[];
}

// Load project data
async function loadProjects(): Promise<Project[]> {
    try {
        const response = await fetch('./data/projects.json');
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
        const response = await fetch('./data/games.json');
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
        const response = await fetch('./data/skills.json');
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

// Load site configuration data
async function loadConfig(): Promise<Config> {
    try {
        const response = await fetch('./data/config.json');
        if (!response.ok) {
            throw new Error('Failed to load site configuration data.');
        }
        return await response.json();
    } catch (error) {
        console.error('Configuration loading error:', error);
        return { site: {}, navigation: [] };
    }
}

export { loadProjects, loadGames, loadSkills, loadConfig };