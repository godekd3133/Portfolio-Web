/**
 * 데이터 로딩 관련 기능을 담당하는 모듈
 */

// 프로젝트 데이터 로드
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
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
        const response = await fetch('data/games.json');
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
        const response = await fetch('data/skills.json');
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

// 회사 경력 데이터 로드
async function loadWorkExperience() {
    try {
        const response = await fetch('data/work-experience.json');
        if (!response.ok) {
            throw new Error('회사 경력 데이터를 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        return data.companies;
    } catch (error) {
        console.error('회사 경력 로드 에러:', error);
        return [];
    }
}

export { loadProjects, loadGames, loadSkills, loadWorkExperience };
