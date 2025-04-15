/**
 * 게임 렌더링 모듈
 */

import { loadGames } from '../utils/dataLoader.js';

// 대표작 게임 렌더링
async function renderFeaturedGame() {
    const featuredGameContainer = document.querySelector('.featured-game');
    if (!featuredGameContainer) return;
    
    const gamesData = await loadGames();
    const game = gamesData.featuredGame;
    
    if (!game) {
        featuredGameContainer.innerHTML = '<p>표시할 대표작이 없습니다.</p>';
        return;
    }
    
    featuredGameContainer.innerHTML = `
        <div class="featured-game-info">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <p>주요 기능:</p>
            <ul>
                ${game.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div class="project-actions">
                <a href="${game.trailerLink}" class="project-btn">게임 트레일러 보기</a>
                <a href="${game.devProcessLink}" class="project-btn secondary">개발 과정 보기</a>
            </div>
        </div>
        <div class="featured-game-image">
            <img src="${game.image}" alt="${game.title}" onerror="this.src='assets/images/games/placeholder.jpg'">
        </div>
    `;
    
    // 게임플레이 영상 렌더링
    const gameVideoContainer = document.querySelector('.game-video');
    if (gameVideoContainer && game.gameplayVideo) {
        gameVideoContainer.innerHTML = `
            <video controls>
                <source src="${game.gameplayVideo}" type="video/mp4">
                브라우저가 비디오 태그를 지원하지 않습니다.
            </video>
        `;
    }
}

export { renderFeaturedGame };