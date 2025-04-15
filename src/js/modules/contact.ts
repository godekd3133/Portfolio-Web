/**
 * Contact form handling module
 */

import { loadConfig } from '../utils/dataLoader.js';

// Handle contact form submission - for static website
async function initContactForm(): Promise<void> {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    // Load site configuration (email address)
    const config = await loadConfig();
    const email = config.site.email || 'your-email@example.com';
    
    contactForm.addEventListener('submit', function(e: Event) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            name: (document.getElementById('name') as HTMLInputElement).value,
            email: (document.getElementById('email') as HTMLInputElement).value,
            subject: (document.getElementById('subject') as HTMLInputElement).value,
            message: (document.getElementById('message') as HTMLTextAreaElement).value
        };
        
        // Form submission is not possible on static websites, use email link instead
        handleStaticFormSubmission(formData, email);
    });
}

// Form handling method for static websites
interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

function handleStaticFormSubmission(formData: FormData, email: string): void {
    try {
        // Verify data
        console.log('Input data:', formData);
        
        // Connect to email client (using mailto: link)
        const subject = encodeURIComponent(formData.subject);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
        
        // Ask user to open email client
        if (confirm('Would you like to send a message through your email app?')) {
            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        } else {
            alert(`Thank you for contacting me! Please contact me directly at: ${email}`);
        }
        
        // Reset form
        (document.getElementById('name') as HTMLInputElement).value = '';
        (document.getElementById('email') as HTMLInputElement).value = '';
        (document.getElementById('subject') as HTMLInputElement).value = '';
        (document.getElementById('message') as HTMLTextAreaElement).value = '';
        
    } catch (error) {
        console.error('Processing error:', error);
        alert(`An error occurred during processing. Please contact me directly via email: ${email}`);
    }
}

export { initContactForm };