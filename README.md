# 게임 개발자 포트폴리오 웹사이트

게임 개발자의 프로젝트와 기술을 소개하는 반응형 포트폴리오 웹사이트입니다. 
Amazon S3를 이용한 정적 웹사이트로 구성되어 있습니다.

## 기능

- 반응형 디자인: 모든 디바이스에서 최적화된 화면 제공
- 게임 프로젝트 전시: 개발한 게임 프로젝트를 카드 형태로 전시
- 기술 스택 소개: 게임 개발에 활용한 기술과 숙련도 표시
- 연락처 폼: 방문자가 이메일로 메시지를 보낼 수 있는 기능
- JSON 기반 데이터 관리: 프로젝트 및 정보 쉽게 업데이트 가능

## 기술 스택

- HTML5
- CSS3
- JavaScript (ES 모듈)
- JSON 데이터 관리

## 디렉토리 구조

```
Portfolio-Web/
└── src/
    ├── index.html               # 메인 HTML 파일
    ├── assets/                  # 정적 자산 파일
    │   └── images/              # 이미지 파일
    │       ├── projects/        # 프로젝트 이미지
    │       ├── games/           # 게임 이미지
    │       └── profile/         # 프로필 이미지
    ├── components/              # HTML 컴포넌트
    │   ├── header/              # 헤더 관련 컴포넌트
    │   ├── projects/            # 프로젝트 섹션 컴포넌트
    │   ├── games/               # 게임 섹션 컴포넌트
    │   ├── skills/              # 기술 스택 섹션 컴포넌트
    │   ├── contact/             # 연락처 섹션 컴포넌트
    │   └── footer/              # 푸터 컴포넌트
    ├── css/                     # 스타일시트
    │   ├── main.css             # 메인 CSS (모듈 임포트)
    │   ├── reset.css            # 기본 스타일 및 리셋
    │   ├── header.css           # 헤더 스타일
    │   ├── projects.css         # 프로젝트 섹션 스타일
    │   ├── games.css            # 게임 섹션 스타일
    │   ├── skills.css           # 기술 스택 섹션 스타일
    │   ├── contact.css          # 연락처 섹션 스타일
    │   └── footer.css           # 푸터 스타일
    ├── js/                      # 자바스크립트
    │   ├── app.js               # 메인 애플리케이션 스크립트
    │   ├── utils/               # 유틸리티 함수
    │   │   ├── dataLoader.js    # 데이터 로드 유틸리티
    │   │   └── lazyLoad.js      # 이미지 지연 로딩 유틸리티
    │   └── modules/             # 기능별 모듈
    │       ├── navigation.js    # 내비게이션 관련 모듈
    │       ├── projects.js      # 프로젝트 렌더링 모듈
    │       ├── games.js         # 게임 렌더링 모듈
    │       ├── skills.js        # 기술 스택 렌더링 모듈
    │       └── contact.js       # 연락처 폼 처리 모듈
    └── data/                    # 데이터 파일
        ├── projects.json        # 프로젝트 정보
        ├── games.json           # 게임 정보
        ├── skills.json          # 기술 스택 정보
        └── config.json          # 사이트 설정 정보
```

## 데이터 편집 방법

프로젝트 정보는 모두 JSON 파일로 분리되어 있어 쉽게 편집할 수 있습니다:

1. **프로젝트 추가/수정**
   - `src/data/projects.json` 파일을 편집하여 프로젝트 정보 업데이트
   - 형식:
     ```json
     {
       "projects": [
         {
           "id": "project-id",
           "title": "프로젝트 제목",
           "description": "프로젝트 설명",
           "tags": ["태그1", "태그2"],
           "image": "assets/images/projects/image.jpg",
           "demoLink": "#",
           "codeLink": "#"
         }
       ]
     }
     ```

2. **게임 정보 수정**
   - `src/data/games.json` 파일 편집
   - 형식:
     ```json
     {
       "featuredGame": {
         "id": "game-id",
         "title": "게임 제목",
         "description": "게임 설명",
         "features": ["특징1", "특징2"],
         "image": "assets/images/games/image.jpg",
         "trailerLink": "#",
         "devProcessLink": "#",
         "gameplayVideo": "assets/images/games/video.mp4"
       }
     }
     ```

3. **기술 스택 수정**
   - `src/data/skills.json` 파일 편집
   - 형식:
     ```json
     {
       "categories": [
         {
           "name": "카테고리명",
           "skills": [
             { "name": "기술명", "level": 90 }
           ]
         }
       ]
     }
     ```

4. **사이트 기본 정보 수정**
   - `src/data/config.json` 파일 편집
   - 형식:
     ```json
     {
       "site": {
         "title": "사이트 제목",
         "author": "제작자 이름",
         "description": "사이트 설명",
         "email": "연락 이메일"
       }
     }
     ```

## 로컬에서 실행하기

```bash
# 로컬 서버 실행 (Python 사용)
cd src
python -m http.server

# 또는 Node.js 서버 사용
npx serve src
```

## S3 배포하기

1. AWS S3 버킷 생성
   - 정적 웹사이트 호스팅 활성화
   - 퍼블릭 액세스 허용 설정

2. `src` 폴더 내의 모든 파일 업로드
   ```bash
   aws s3 sync src/ s3://your-bucket-name/ --acl public-read
   ```

3. S3 웹사이트 URL 접속 확인

## 최적화 정보

- 모듈화된 구조로 유지보수 용이
- 지연 로딩으로 초기 로드 시간 단축
- JSON 데이터 분리로 컨텐츠 관리 간소화
- 컴포넌트별 CSS 분리로 성능 개선
- ES 모듈 시스템으로 코드 구조화

## 라이센스
MIT