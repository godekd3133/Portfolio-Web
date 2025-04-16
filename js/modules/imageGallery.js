/**
 * 이미지 갤러리 모달 관련 기능을 담당하는 모듈
 */

// 이미지 모달 초기화
function initImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    
    if (!modal || !modalImage || !modalClose) return;
    
    // 모달 닫기 버튼 이벤트
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
    
    // 모달 바깥쪽 클릭 시 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// 프로젝트 갤러리 초기화
function initProjectGalleries() {
    // 페이지 내의 모든 갤러리 아이템을 선택
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    if (!modal || !modalImage) return;
    
    // 각 갤러리 아이템에 클릭 이벤트 추가
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // 모달 이미지 소스 설정
            modalImage.src = item.src;
            modalImage.alt = item.alt;
            
            // 모달 표시
            modal.classList.add('active');
        });
    });
}

// 모듈 초기화
function initImageGallery() {
    window.addEventListener('load', () => {
        initImageModal();
        
        // 갤러리 아이템은 동적으로 생성되므로, 페이지 로드 후 지연시간을 두고 초기화
        setTimeout(() => {
            initProjectGalleries();
        }, 1000);
        
        // 새로운 갤러리 아이템이 추가될 수 있으므로 주기적으로 초기화
        setInterval(() => {
            initProjectGalleries();
        }, 5000);
    });
}

export { initImageGallery };
