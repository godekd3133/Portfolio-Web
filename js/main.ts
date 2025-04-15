/**
 * Main JavaScript File
 * Initialize all modules and application components
 */

// Import modules
import { initNavigation } from './modules/navigation';
import { initAnimations } from './modules/animations';
import { initProjectRenderer } from './modules/projectRenderer';
import { lazyLoadImages, detectMobileDevice } from './modules/utils';
import { loadComponents } from './modules/componentLoader';
import { initContactForm } from './modules/contact';

// Component interface
interface Component {
    id: string;
    path: string;
}

// Configuration
const CONFIG: {
    components: Component[]
} = {
    components: [
        { id: 'header-container', path: '../components/header.html' },
        { id: 'navigation-container', path: '../components/navigation.html' },
        { id: 'projects-container', path: '../components/projects.html' },
        { id: 'skills-container', path: '../components/skills.html' },
        { id: 'contact-container', path: '../components/contact.html' },
        { id: 'footer-container', path: '../components/footer.html' }
    ]
};

/**
 * Initialize the application
 * @returns {Promise<void>}
 */
async function initApp(): Promise<void> {
    try {
        // Load components first
        await loadComponents(CONFIG.components);
        
        // Initialize core modules
        initNavigation();
        initAnimations();
        initProjectRenderer();
        initContactForm();
        
        // Setup lazy loading
        window.addEventListener('load', lazyLoadImages);
        
        // Add mobile device class if needed
        detectMobileDevice();
        
        console.log('Portfolio website initialized successfully');
    } catch (error) {
        console.error('Error initializing website:', error);
    }
}

// Initialize application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);