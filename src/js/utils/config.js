/**
 * 사이트 설정 상수
 */

// API 경로
export const API_PATHS = {
  PROJECTS: './data/projects.json',
  GAMES: './data/games.json',
  SKILLS: './data/skills.json',
  CONFIG: './data/config.json'
};

// 개발 환경 설정
export const IS_DEVELOPMENT = window.location.hostname === 'localhost' || 
                             window.location.hostname === '127.0.0.1';

// 기본 이미지 경로
export const DEFAULT_IMAGES = {
  PROJECT: 'assets/images/projects/placeholder.jpg',
  GAME: 'assets/images/games/placeholder.jpg',
  PROFILE: 'assets/images/profile/placeholder.jpg'
};

// 기본 설정값
export const DEFAULT_CONFIG = {
  site: {
    title: '게임 개발자 포트폴리오',
    author: '김민규',
    description: '게임 개발자 | 3D 아티스트',
    email: 'your-email@example.com'
  },
  social: {
    github: '#',
    linkedin: '#',
    twitter: '#',
    artstation: '#'
  }
};