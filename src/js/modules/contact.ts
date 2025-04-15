/**
 * Contact Form Module
 */

/**
 * Initializes the contact form functionality
 */
export function initContactForm(): void {
    const contactForm = document.getElementById('contact-form') as HTMLFormElement;
    
    if (!contactForm) {
        console.warn('Contact form not found in the document');
        return;
    }
    
    contactForm.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        
        // Here you would typically send the data to a server
        // For now, just log it and show a success message
        console.log('Form submission:', { name, email, message });
        
        // Show success message
        alert('메시지가 성공적으로 전송되었습니다. 곧 연락드리겠습니다!');
        
        // Reset form
        contactForm.reset();
    });
    
    console.log('Contact form initialized');
}