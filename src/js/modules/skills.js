/**
 * 기술 스택 렌더링 모듈
 */

import { loadSkills } from '../utils/dataLoader.js';

// 기술 스택 렌더링
async function renderSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;
    
    const skillCategories = await loadSkills();
    
    if (skillCategories.length === 0) {
        skillsContainer.innerHTML = '<p>표시할 기술 스택이 없습니다.</p>';
        return;
    }
    
    skillsContainer.innerHTML = skillCategories.map(category => `
        <div class="skill-category">
            <h3>${category.name}</h3>
            <ul class="skill-list">
                ${category.skills.map(skill => `
                    <li class="skill-item">
                        <span class="skill-name">${skill.name}</span>
                        <div class="skill-bar">
                            <div class="skill-level" style="width: ${skill.level}%;"></div>
                        </div>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

export { renderSkills };