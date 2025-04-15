/**
 * Main application script
 */

import { initNavigation } from './modules/navigation.js';
import { renderProjects } from './modules/projects.js';
import { renderFeaturedGame } from './modules/games.js';
import { renderSkills } from './modules/skills.js';
import { initContactForm } from './modules/contact.js';
import { lazyLoadImages } from './utils/lazyLoad.js';

// Execute when page load is complete
document.addEventListener('DOMContentLoaded', (): void => {
    // Initialize navigation
    initNavigation();
    
    // Render projects
    renderProjects();
    
    // Render games
    renderFeaturedGame();
    
    // Render tech stack
    renderSkills();
    
    // Handle form submission
    initContactForm();
});

// Load images after page load
window.addEventListener('load', lazyLoadImages);