/**
 * 메인 애플리케이션 스크립트
 */

import { initNavigation } from './modules/navigation.js';
import { renderProjects } from './modules/projects.js';
import { renderFeaturedGame } from './modules/games.js';
import { renderSkills } from './modules/skills.js';
import { initContactForm } from './modules/contact.js';
import { lazyLoadImages } from './utils/lazyLoad.js';

// 페이지 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', () => {
    // 내비게이션 초기화
    initNavigation();
    
    // 프로젝트 렌더링
    renderProjects();
    
    // 게임 렌더링
    renderFeaturedGame();
    
    // 기술 스택 렌더링
    renderSkills();
    
    // 폼 제출 처리
    initContactForm();
});

// 페이지 로드 후 이미지 로딩
window.addEventListener('load', lazyLoadImages);