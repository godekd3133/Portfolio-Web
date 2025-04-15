/**
 * 데이터 로딩 유틸리티 모듈
 */

// 프로젝트 데이터 로드
async function loadProjects() {
    try {
        const response = await fetch('./data/projects.json');
        if (!response.ok) {
            throw new Error('프로젝트 데이터를 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        return data.projects;
    } catch (error) {
        console.error('프로젝트 로드 에러:', error);
        return [];
    }
}

// 게임 데이터 로드
async function loadGames() {
    try {
        const response = await fetch('./data/games.json');
        if (!response.ok) {
            throw new Error('게임 데이터를 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('게임 로드 에러:', error);
        return { featuredGame: null, otherGames: [] };
    }
}

// 기술 스택 데이터 로드
async function loadSkills() {
    try {
        const response = await fetch('./data/skills.json');
        if (!response.ok) {
            throw new Error('기술 스택 데이터를 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.error('기술 스택 로드 에러:', error);
        return [];
    }
}

// 사이트 설정 데이터 로드
async function loadConfig() {
    try {
        const response = await fetch('./data/config.json');
        if (!response.ok) {
            throw new Error('사이트 설정 데이터를 불러오는데 실패했습니다.');
        }
        return await response.json();
    } catch (error) {
        console.error('설정 로드 에러:', error);
        return { site: {}, navigation: [] };
    }
}

export { loadProjects, loadGames, loadSkills, loadConfig };