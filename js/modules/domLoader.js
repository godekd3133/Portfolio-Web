/**
 * HTML 컴포넌트 로드 기능을 담당하는 모듈
 */

// 컴포넌트 로드 함수
async function loadComponent(url, targetElement) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`컴포넌트 로드 실패: ${url}`);
        }
        const html = await response.text();
        
        if (targetElement) {
            targetElement.innerHTML = html;
        }
        
        return true;
    } catch (error) {
        console.error('컴포넌트 로드 에러:', error);
        return false;
    }
}

// 모든 컴포넌트 로드
async function loadAllComponents() {
    const componentsToLoad = [
        { url: 'components/preloader.html', selector: '#preloader-container' },
        { url: 'components/header.html', selector: '#header-container' },
        { url: 'components/navigation.html', selector: '#nav-container' },
        { url: 'components/about.html', selector: '#main-content' },
        { url: 'components/projects.html', selector: '#main-content', append: true },
        { url: 'components/featured-games.html', selector: '#main-content', append: true },
        { url: 'components/skills.html', selector: '#main-content', append: true },
        { url: 'components/resume.html', selector: '#main-content', append: true },
        { url: 'components/contact.html', selector: '#main-content', append: true },
        { url: 'components/footer.html', selector: '#footer-container' }
    ];

    for (const component of componentsToLoad) {
        const targetElement = document.querySelector(component.selector);
        
        if (targetElement) {
            if (component.append) {
                const tempDiv = document.createElement('div');
                await loadComponent(component.url, tempDiv);
                targetElement.appendChild(tempDiv.firstChild);
            } else {
                await loadComponent(component.url, targetElement);
            }
        } else {
            console.error(`선택자를 찾을 수 없음: ${component.selector}`);
        }
    }
}

export { loadAllComponents };
