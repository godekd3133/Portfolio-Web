/**
 * Main application script
 */

// 상위 경로의 모듈 파일들을 참조
import { initNavigation } from '../../js/modules/navigation';
import { initProjectRenderer } from '../../js/modules/projectRenderer';
import { initContactForm } from '../../js/modules/contact';
import { lazyLoadImages } from './utils/lazyLoad';

// Execute when page load is complete
document.addEventListener('DOMContentLoaded', (): void => {
    // Initialize navigation
    initNavigation();
    
    // 통합된 프로젝트 렌더러 사용
    initProjectRenderer();
    
    // Handle form submission
    initContactForm();
});

// Load images after page load
window.addEventListener('load', lazyLoadImages);