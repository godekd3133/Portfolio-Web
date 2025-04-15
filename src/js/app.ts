/**
 * Main application script
 */

import { initNavigation } from './modules/navigation';
import { renderProjects } from './modules/projects';
import { renderFeaturedGame } from './modules/games';
import { renderSkills } from './modules/skills';
import { initContactForm } from './modules/contact';
import { lazyLoadImages } from './utils/lazyLoad';

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