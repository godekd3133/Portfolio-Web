/**
 * Component Loader Module
 * Handles dynamic loading of HTML components for modular structure
 */

// Component interface
interface Component {
    id: string;
    path: string;
}

/**
 * Load a single component
 * @param {string} url - Path to the component HTML file
 * @param {string} containerId - ID of the container element
 * @returns {Promise<boolean>} - Success status
 */
async function loadComponent(url: string, containerId: string): Promise<boolean> {
    try {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container not found: ${containerId}`);
            return false;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${url} (${response.status})`);
        }
        
        const html = await response.text();
        container.innerHTML = html;
        return true;
    } catch (error) {
        console.error('Component loading error:', error);
        return false;
    }
}

/**
 * Load multiple components in parallel
 * @param {Array} components - Array of component objects {id, path}
 * @returns {Promise<boolean[]>} - Array of success statuses
 */
async function loadComponents(components: Component[]): Promise<boolean[]> {
    try {
        const loadPromises = components.map(component => 
            loadComponent(component.path, component.id)
        );
        
        const results = await Promise.allSettled(loadPromises);
        
        // Log failures if any
        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                console.error(`Failed to load component: ${components[index].path}`, result.reason);
            }
        });
        
        return results.map(result => result.status === 'fulfilled' && result.value);
    } catch (error) {
        console.error('Error loading components:', error);
        return components.map(() => false);
    }
}

/**
 * Append a component to a container
 * @param {string} url - Path to the component HTML file  
 * @param {string} containerId - ID of the container element
 * @returns {Promise<Element|null>} - The appended element or null on failure
 */
async function appendComponent(url: string, containerId: string): Promise<Element|null> {
    try {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container not found: ${containerId}`);
            return null;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${url}`);
        }
        
        const html = await response.text();
        const temp = document.createElement('div');
        temp.innerHTML = html.trim();
        
        // Get the first element (the component root)
        const component = temp.firstChild as Element;
        if (component) {
            container.appendChild(component);
            return component;
        }
        return null;
    } catch (error) {
        console.error('Component append error:', error);
        return null;
    }
}

export { loadComponent, loadComponents, appendComponent };