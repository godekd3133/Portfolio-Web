/**
 * 메인 JavaScript 파일
 * 모든 모듈을 가져와서 초기화합니다
 */

// 모듈 가져오기
import { initNavigation } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';
import { initRenderers } from './modules/projectRenderer.js';
import { lazyLoadImages } from './modules/utils.js';
import { loadAllComponents } from './modules/componentLoader.js';

// 페이지 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 컴포넌트 로드
        await loadAllComponents();
        
        // 네비게이션 기능 초기화
        initNavigation();
        
        // 애니메이션 초기화
        initAnimations();
        
        // 프로젝트, 게임, 기술 데이터 렌더링
        initRenderers();
        
        // 이미지 지연 로딩
        window.addEventListener('load', lazyLoadImages);
        
        console.log('포트폴리오 웹사이트가 성공적으로 초기화되었습니다.');
    } catch (error) {
        console.error('웹사이트 초기화 중 오류가 발생했습니다:', error);
    }
});

// 모바일 디바이스 감지 및 최적화
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    document.body.classList.add('mobile-device');
}
