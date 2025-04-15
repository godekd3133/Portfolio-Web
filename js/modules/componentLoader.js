/**
 * 동적 컴포넌트 로더
 * S3 정적 웹사이트 배포 시 HTML 파일을 분리해서 로드하기 위한 모듈
 */

// 컴포넌트 로드 함수
async function loadComponent(url, container) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`컴포넌트를 불러오는데 실패했습니다: ${url}`);
        }
        
        const html = await response.text();
        container.innerHTML = html;
        return true;
    } catch (error) {
        console.error('컴포넌트 로드 에러:', error);
        return false;
    }
}

// 모든 컴포넌트 로딩
async function loadAllComponents() {
    const components = [
        { 
            id: 'preloader-container', 
            url: 'components/preloader.html' 
        },
        { 
            id: 'header-container', 
            url: 'components/header.html' 
        },
        { 
            id: 'nav-container', 
            url: 'components/navigation.html' 
        }
    ];

    const mainContentComponents = [
        'components/about.html',
        'components/contact.html',
        'components/resume.html',
        'components/work-experience.html',
        'components/projects.html',
        'components/featured-games.html',
        'components/skills.html'
    ];

    const mainContent = document.getElementById('main-content');
    
    // 개별 컨테이너에 컴포넌트 로드
    for (const component of components) {
        const container = document.getElementById(component.id);
        if (container) {
            await loadComponent(component.url, container);
        }
    }
    
    // 메인 콘텐츠 영역에 순차적으로 컴포넌트 추가
    if (mainContent) {
        mainContent.innerHTML = '';
        
        for (const url of mainContentComponents) {
            const tempContainer = document.createElement('div');
            await loadComponent(url, tempContainer);
            
            // 첫 번째 자식 요소(섹션)만 추가
            if (tempContainer.firstChild) {
                mainContent.appendChild(tempContainer.firstChild);
            }
        }
    }
    
    // 푸터 로드
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        await loadComponent('components/footer.html', footerContainer);
    }
}

export { loadComponent, loadAllComponents };
