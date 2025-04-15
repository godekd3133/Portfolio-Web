# 🎮 게임 개발자 포트폴리오 웹사이트

<div align="center">
  
  ![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
  ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
  
</div>

<p align="center">
  <img src="images/profile/placeholder.jpg" alt="포트폴리오 미리보기" width="600px" style="border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
</p>

## 📋 개요

이 포트폴리오 웹사이트는 게임 개발자의 프로젝트와 기술을 세련된 디자인으로 소개하는 **반응형 웹 애플리케이션**입니다. 
모던한 웹 기술을 활용하여 제작되었으며, **Amazon S3**를 이용한 정적 웹사이트로 구성되어 있습니다.

## ✨ 주요 기능

- **📱 반응형 디자인** - 모바일부터 데스크탑까지 모든 디바이스에서 최적화된 UI/UX 제공
- **🎲 프로젝트 쇼케이스** - 다양한 게임/웹 개발 프로젝트를 시각적으로 매력적인 카드 형태로 전시
- **🧰 기술 스택 시각화** - 개발에 활용한 언어와 프레임워크의 숙련도를 애니메이션 그래프로 표현
- **📞 인터랙티브 연락처** - 방문자가 직접 메시지를 남길 수 있는 대화형 인터페이스
- **⚡ 성능 최적화** - 지연 로딩, 코드 분할 등을 통한 빠른 로딩 속도 제공
- **🔄 JSON 기반 데이터 관리** - 외부 데이터 파일을 통한 손쉬운 콘텐츠 업데이트

## 🛠️ 기술 스택

이 프로젝트는 다음과 같은 기술로 구현되었습니다:

### 프론트엔드
- **HTML5** - 시맨틱 태그를 활용한 접근성 높은 마크업
- **CSS3** - 고급 애니메이션과 반응형 레이아웃
  - Flexbox 및 Grid 시스템
  - CSS 변수를 활용한 테마 관리
  - 키프레임 애니메이션과 트랜지션 효과
- **JavaScript (ES6+)**
  - ES 모듈 시스템을 활용한 코드 모듈화
  - Fetch API를 통한 비동기 데이터 로딩
  - DOM 조작 최적화
  - 인터섹션 옵저버를 활용한 지연 로딩
  
### 데이터 관리
- **JSON** - 구조화된 데이터 포맷으로 프로젝트 정보 관리
- **모듈형 데이터 아키텍처** - 데이터 타입별 분리로 유지보수성 향상

### 배포 및 인프라
- **AWS S3** - 정적 웹 호스팅
- **AWS CloudFront** - 글로벌 CDN 배포 (선택적)
- **AWS Route 53** - DNS 관리 (선택적)

## 📂 프로젝트 아키텍처

```
Portfolio-Web/
│
├── 📁 components/            # 재사용 가능한 HTML 컴포넌트
│   ├── header.html           # 헤더 섹션
│   ├── projects.html         # 프로젝트 갤러리
│   ├── featured-games.html   # 주요 게임 프로젝트
│   ├── skills.html           # 기술 스택 
│   ├── contact.html          # 연락처 폼
│   └── footer.html           # 푸터 섹션
│
├── 📁 css/                   # 스타일시트
│   ├── main.css              # 메인 스타일시트 (모듈 통합)
│   ├── base.css              # 기본 스타일과 변수
│   ├── components/           # 컴포넌트별 스타일
│   │   ├── header.css        # 헤더 스타일
│   │   ├── navigation.css    # 내비게이션 스타일
│   │   ├── projects.css      # 프로젝트 갤러리 스타일
│   │   └── ...               # 기타 컴포넌트 스타일
│   └── pages/                # 페이지별 스타일
│       └── about.css         # About 페이지 스타일
│
├── 📁 js/                    # 자바스크립트 파일
│   ├── main.js               # 주요 자바스크립트 파일
│   └── modules/              # 기능별 모듈
│       ├── animations.js     # 애니메이션 로직
│       ├── dataLoader.js     # JSON 데이터 로딩
│       ├── navigation.js     # 내비게이션 컨트롤
│       └── ...               # 기타 모듈
│
├── 📁 data/                  # 데이터 파일
│   ├── projects.json         # 프로젝트 정보
│   ├── games.json            # 게임 프로젝트 정보
│   └── skills.json           # 기술 스택 정보
│
├── 📁 images/                # 이미지 에셋
│   ├── profile/              # 프로필 이미지
│   ├── projects/             # 프로젝트 썸네일
│   └── games/                # 게임 관련 이미지
│
├── index.html                # 메인 페이지
└── README.md                 # 프로젝트 문서
```

## 🎨 특징적인 구현 기술

### 컴포넌트 기반 아키텍처
이 포트폴리오는 **모듈형 구조**를 채택하여 HTML 컴포넌트, CSS 모듈, JavaScript 모듈로 구성되어 있습니다. 이를 통해 코드의 재사용성과 유지보수성을 크게 향상시켰습니다.

```javascript
// 컴포넌트 로딩 예시 (componentLoader.js)
export async function loadComponent(containerId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;
    return true;
  } catch (error) {
    console.error(`컴포넌트 로딩 실패: ${componentPath}`, error);
    return false;
  }
}
```

### 애니메이션 최적화
CSS 트랜지션과 JavaScript의 IntersectionObserver API를 활용하여 부드러운 스크롤 기반 애니메이션을 구현했습니다.

```javascript
// 스크롤 애니메이션 예시 (animations.js)
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  elements.forEach(element => observer.observe(element));
};
```

### 데이터 기반 동적 렌더링
외부 JSON 파일에서 데이터를 로드하여 동적으로 콘텐츠를 생성하는 방식을 채택했습니다. 이를 통해 코드 변경 없이도 콘텐츠 업데이트가 가능합니다.

```javascript
// 프로젝트 렌더링 예시 (projectRenderer.js)
async function renderProjects() {
  try {
    const response = await fetch('./data/projects.json');
    const data = await response.json();
    
    const projectsContainer = document.querySelector('.projects-grid');
    
    data.projects.forEach(project => {
      const projectElement = createProjectCard(project);
      projectsContainer.appendChild(projectElement);
    });
    
  } catch (error) {
    console.error('프로젝트 렌더링 중 오류 발생:', error);
  }
}

function createProjectCard(project) {
  // 프로젝트 카드 생성 로직
}
```

## 💻 로컬에서 실행하기

로컬 환경에서 프로젝트를 실행하는 방법입니다:

```bash
# 1. 저장소 클론
git clone https://github.com/yourusername/portfolio-web.git
cd portfolio-web

# 2. 로컬 서버 실행 (선택 옵션)
# Python 사용
python -m http.server

# 또는 Node.js 서버 사용
npx serve

# 브라우저에서 http://localhost:8000 또는 http://localhost:3000 접속
```

## 🚀 배포 가이드

이 포트폴리오 웹사이트는 AWS S3를 활용한 정적 웹 호스팅에 최적화되어 있습니다.

### AWS S3 배포 과정

1. **S3 버킷 생성 및 설정**
   ```bash
   # AWS CLI를 이용한 S3 버킷 생성
   aws s3 mb s3://your-portfolio-bucket --region ap-northeast-2
   
   # 정적 웹사이트 호스팅 활성화
   aws s3 website s3://your-portfolio-bucket --index-document index.html --error-document error.html
   ```

2. **파일 업로드**
   ```bash
   # 모든 파일을 S3에 업로드
   aws s3 sync ./ s3://your-portfolio-bucket --acl public-read
   ```

3. **CloudFront 배포 (선택사항)**
   - AWS Management Console에서 CloudFront 배포 생성
   - S3 버킷을 오리진으로 설정
   - HTTPS 활성화 및 캐싱 설정

## 🔧 콘텐츠 관리 방법

이 포트폴리오는 JSON 파일을 통해 쉽게 콘텐츠를 관리할 수 있습니다.

### 프로젝트 추가/수정

`data/projects.json` 파일을 편집하여 프로젝트 정보를 업데이트합니다:

```json
{
  "projects": [
    {
      "id": "project-id",
      "title": "프로젝트 제목",
      "description": "상세한 프로젝트 설명...",
      "tags": ["HTML5", "CSS3", "JavaScript"],
      "image": "images/projects/project-image.jpg",
      "demoLink": "https://demo-link.com",
      "codeLink": "https://github.com/username/repo"
    }
  ]
}
```

### 기술 스택 업데이트

`data/skills.json` 파일을 통해 보유 기술을 관리합니다:

```json
{
  "categories": [
    {
      "name": "프론트엔드",
      "skills": [
        { "name": "HTML5", "level": 95 },
        { "name": "CSS3", "level": 90 },
        { "name": "JavaScript", "level": 85 }
      ]
    },
    {
      "name": "게임 개발",
      "skills": [
        { "name": "Unity", "level": 80 },
        { "name": "C#", "level": 85 }
      ]
    }
  ]
}
```

## 📊 성능 최적화

이 프로젝트는 다음과 같은 성능 최적화 기법을 구현했습니다:

1. **이미지 최적화**
   - 반응형 이미지 크기 및 포맷 적용
   - 지연 로딩으로 초기 로드 시간 단축

2. **CSS 최적화**
   - 컴포넌트별 모듈화로 필요한 스타일만 로드
   - CSS 변수 활용으로 중복 코드 최소화

3. **JavaScript 최적화**
   - 모듈 분리로 필요한 기능만 로드
   - 이벤트 위임 패턴 적용으로 메모리 효율 개선
   - 디바운싱 및 스로틀링 기법 적용

4. **렌더링 최적화**
   - 가상 DOM 유사 패턴 적용으로 불필요한 리렌더링 방지
   - 키 애니메이션 프레임 최적화

## 📱 반응형 디자인

3가지 주요 브레이크포인트로 모든 디바이스에서 최적의 사용자 경험을 제공합니다:

- **모바일**: 480px 이하
- **태블릿**: 481px ~ 768px
- **데스크탑**: 769px 이상

CSS Grid와 Flexbox를 조합하여 유동적인 레이아웃을 구현했습니다.

## 📄 라이센스

이 프로젝트는 [MIT 라이센스](https://opensource.org/licenses/MIT)를 따릅니다.

---

<div align="center">
  
  **[포트폴리오 방문하기](https://your-portfolio-url.com)** | **[GitHub](https://github.com/yourusername)** | **[LinkedIn](https://linkedin.com/in/yourusername)**
  
  Made with ❤️ by Minkyu Kim
  
</div>