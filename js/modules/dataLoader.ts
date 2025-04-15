/**
 * Data Loader Module
 * Handles loading of all data from JSON files with caching support
 */

// Define interfaces for data types
interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    demoLink: string;
    codeLink: string;
}

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

interface Skill {
    name: string;
    level: number;
}

interface SkillCategory {
    name: string;
    skills: Skill[];
}

interface WorkExperience {
    company: string;
    position: string;
    duration: string;
    description: string;
    achievements: string[];
}

// Cache for loaded data to prevent redundant requests
const dataCache = new Map<string, any>();

/**
 * Loads data from a JSON file with caching
 * @param {string} url - Path to the JSON file
 * @param {string} cacheKey - Key to store data in cache
 * @param {Function} transform - Optional transformation function for the loaded data
 * @returns {Promise<any>} - The loaded data
 */
async function loadData<T, R = T>(
    url: string, 
    cacheKey: string, 
    transform: (data: T) => R = (data: T) => data as unknown as R
): Promise<R> {
    // Return cached data if available
    if (dataCache.has(cacheKey)) {
        return dataCache.get(cacheKey);
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load data from ${url} (${response.status}: ${response.statusText})`);
        }
        
        const data = await response.json() as T;
        const transformedData = transform(data);
        
        // Cache the data
        dataCache.set(cacheKey, transformedData);
        return transformedData;
    } catch (error) {
        console.error(`Error loading data from ${url}:`, error);
        throw error;
    }
}

/**
 * Loads project data from projects.json
 * @returns {Promise<Array>} - Array of project objects
 */
async function loadProjects(): Promise<Project[]> {
    try {
        const data = await loadData<{projects: Project[]}, Project[]>(
            'data/projects.json', 
            'projects', 
            data => data.projects
        );
        return data;
    } catch (error) {
        console.error('Failed to load projects:', error);
        return [];
    }
}

/**
 * Loads game data from games.json
 * @returns {Promise<Object>} - Object with featuredGame and otherGames properties
 */
async function loadGames(): Promise<GamesData> {
    try {
        const data = await loadData<GamesData, GamesData>('data/games.json', 'games');
        return data;
    } catch (error) {
        console.error('Failed to load games:', error);
        return { featuredGame: null, otherGames: [] };
    }
}

/**
 * Loads skill data from skills.json
 * @returns {Promise<Array>} - Array of skill category objects
 */
async function loadSkills(): Promise<SkillCategory[]> {
    try {
        const data = await loadData<{categories: SkillCategory[]}, SkillCategory[]>(
            'data/skills.json', 
            'skills', 
            data => data.categories
        );
        return data;
    } catch (error) {
        console.error('Failed to load skills:', error);
        return [];
    }
}

/**
 * Loads work experience data from work-experience.json
 * @returns {Promise<Array>} - Array of company objects
 */
async function loadWorkExperience(): Promise<WorkExperience[]> {
    try {
        const data = await loadData<{companies: WorkExperience[]}, WorkExperience[]>(
            'data/work-experience.json', 
            'workExperience', 
            data => data.companies
        );
        return data;
    } catch (error) {
        console.error('Failed to load work experience:', error);
        return [];
    }
}

/**
 * Clears the data cache
 * Useful when you want to force a reload of the data
 * @param {string|null} key - Specific cache key to clear, or null to clear all
 */
function clearCache(key: string | null = null): void {
    if (key === null) {
        dataCache.clear();
    } else if (dataCache.has(key)) {
        dataCache.delete(key);
    }
}

export { 
    loadProjects, 
    loadGames, 
    loadSkills, 
    loadWorkExperience,
    clearCache
};