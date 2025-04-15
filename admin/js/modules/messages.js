// 메시지 관리 모듈

// 메시지 관리 초기화 함수
function initMessages() {
    // 메시지 목록 로드
    loadMessages();
    
    // 검색 기능 초기화
    const searchInput = document.getElementById('message-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            loadMessages();
        }, 300));
    }
    
    // 페이지네이션 초기화
    const prevPageBtn = document.getElementById('prev-messages-page');
    const nextPageBtn = document.getElementById('next-messages-page');
    
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => {
            const currentPage = parseInt(document.getElementById('current-messages-page').textContent);
            if (currentPage > 1) {
                loadMessages(currentPage - 1);
            }
        });
    }
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => {
            const currentPage = parseInt(document.getElementById('current-messages-page').textContent);
            const totalPages = parseInt(document.getElementById('total-messages-pages').textContent);
            if (currentPage < totalPages) {
                loadMessages(currentPage + 1);
            }
        });
    }
    
    // 전체 선택 체크박스 초기화
    const selectAllCheckbox = document.getElementById('select-all-messages');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', () => {
            const checkboxes = document.querySelectorAll('#messages-table input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });
    }
    
    // 전체 읽음 표시 버튼 초기화
    const markAllReadBtn = document.getElementById('mark-all-read-btn');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('#messages-table input[type="checkbox"]:checked');
            const messageIds = Array.from(checkboxes).map(checkbox => checkbox.getAttribute('data-id'));
            
            if (messageIds.length === 0) {
                showNotification('선택된 메시지가 없습니다.', 'error');
                return;
            }
            
            markMessagesAsRead(messageIds);
        });
    }
    
    // 메시지 모달 초기화
    initMessageModal();
}

// 메시지 목록 로드 함수
function loadMessages(page = 1, limit = 10) {
    const searchInput = document.getElementById('message-search');
    const searchTerm = searchInput ? searchInput.value : '';
    
    // 임시 데이터 (데모용)
    const demoMessages = [
        { 
            _id: '1', 
            name: '김희망', 
            email: 'hopekim@example.com', 
            subject: '협업 제안', 
            message: '안녕하세요, 귀하의 포트폴리오를 보고 연락드립니다. 저희 팀에서 진행 중인 모바일 게임 프로젝트에 참여해 주실 수 있을지 문의드립니다. 편하실 때 회신 부탁드립니다.',
            read: false, 
            createdAt: '2025-04-14T09:30:00' 
        },
        { 
            _id: '2', 
            name: '이민준', 
            email: 'mjlee@example.com', 
            subject: '취업 문의', 
            message: '안녕하세요, 게임 개발자를 꿈꾸는 컴퓨터공학과 학생입니다. 취업 준비 과정에서 조언을 구하고 싶어 연락드립니다.',
            read: false, 
            createdAt: '2025-04-12T14:45:00' 
        },
        { 
            _id: '3', 
            name: '박서윤', 
            email: 'sypark@example.com', 
            subject: '포트폴리오 피드백', 
            message: '안녕하세요, 귀하의 포트폴리오가 정말 인상적입니다. 특히 VR 프로젝트가 매우 흥미롭게 보였습니다. 제 포트폴리오에 대한 피드백을 주실 수 있을까요?',
            read: false, 
            createdAt: '2025-04-10T11:20:00' 
        },
        { 
            _id: '4', 
            name: '최준호', 
            email: 'jchoi@example.com', 
            subject: '프로젝트 관련 질문', 
            message: '안녕하세요, 귀하의 3D 액션 게임 프로젝트에 관심이 많습니다. 어떤 기술과 도구를 사용하셨는지 여쭤보고 싶습니다.',
            read: true, 
            createdAt: '2025-04-05T10:10:00' 
        },
        { 
            _id: '5', 
            name: '정다은', 
            email: 'dejung@example.com', 
            subject: '게임 제작 컨설팅 문의', 
            message: '안녕하세요, 저희는 교육용 게임을 제작하고자 하는 스타트업입니다. 귀하의 경험과 전문성을 활용한 컨설팅이 가능할지 문의드립니다.',
            read: true, 
            createdAt: '2025-03-28T15:25:00' 
        }
    ];
    
    // 검색어가 있으면 필터링
    let filteredMessages = demoMessages;
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredMessages = demoMessages.filter(message => 
            message.name.toLowerCase().includes(term) || 
            message.subject.toLowerCase().includes(term) || 
            message.email.toLowerCase().includes(term)
        );
    }
    
    // 페이지네이션 계산
    const totalMessages = filteredMessages.length;
    const totalPages = Math.ceil(totalMessages / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedMessages = filteredMessages.slice(startIndex, endIndex);
    
    renderMessages(paginatedMessages);
    updateMessagesPagination(page, totalPages);
}

// 메시지 렌더링 함수
function renderMessages(messages) {
    const tableBody = document.getElementById('messages-table');
    
    if (!tableBody) {
        console.error('messages-table 요소를 찾을 수 없습니다.');
        return;
    }
    
    if (messages.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="text-center">메시지가 없습니다.</td></tr>';
        return;
    }
    
    let html = '';
    
    messages.forEach(message => {
        const date = new Date(message.createdAt).toLocaleDateString('ko-KR');
        const status = message.read ? 
            '<span class="status-badge status-read">읽음</span>' : 
            '<span class="status-badge status-unread">읽지 않음</span>';
        
        html += `
            <tr>
                <td><input type="checkbox" data-id="${message._id}"></td>
                <td>${status}</td>
                <td>${message.name}</td>
                <td>${message.email}</td>
                <td>${message.subject}</td>
                <td>${date}</td>
                <td>
                    <button class="action-btn view-message-btn" data-id="${message._id}" title="상세 보기">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn delete-message-btn" data-id="${message._id}" title="삭제">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
    
    // 작업 버튼 이벤트 연결
    document.querySelectorAll('.view-message-btn').forEach(button => {
        button.addEventListener('click', () => {
            const messageId = button.getAttribute('data-id');
            showMessageModal(messageId);
        });
    });
    
    document.querySelectorAll('.delete-message-btn').forEach(button => {
        button.addEventListener('click', () => {
            const messageId = button.getAttribute('data-id');
            confirmDeleteMessage(messageId);
        });
    });
    
    // 체크박스 변경 이벤트
    document.querySelectorAll('#messages-table input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const selectAllCheckbox = document.getElementById('select-all-messages');
            const checkboxes = document.querySelectorAll('#messages-table input[type="checkbox"]');
            const checkedCount = document.querySelectorAll('#messages-table input[type="checkbox"]:checked').length;
            
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = checkedCount === checkboxes.length && checkboxes.length > 0;
                selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < checkboxes.length;
            }
        });
    });
}

// 페이지네이션 업데이트 함수
function updateMessagesPagination(currentPage, totalPages) {
    const currentPageEl = document.getElementById('current-messages-page');
    const totalPagesEl = document.getElementById('total-messages-pages');
    const prevPageBtn = document.getElementById('prev-messages-page');
    const nextPageBtn = document.getElementById('next-messages-page');
    
    if (currentPageEl) currentPageEl.textContent = currentPage;
    if (totalPagesEl) totalPagesEl.textContent = totalPages;
    
    // 이전/다음 버튼 활성화/비활성화
    if (prevPageBtn) prevPageBtn.disabled = currentPage <= 1;
    if (nextPageBtn) nextPageBtn.disabled = currentPage >= totalPages;
}

// 메시지 모달 초기화 함수
function initMessageModal() {
    // 모달 닫기 버튼
    const closeModalBtn = document.querySelector('#message-modal .close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            document.getElementById('message-modal').style.display = 'none';
        });
    }
    
    // 삭제 버튼
    const deleteMessageBtn = document.getElementById('delete-message-btn');
    if (deleteMessageBtn) {
        deleteMessageBtn.addEventListener('click', () => {
            const messageId = document.getElementById('message-modal').getAttribute('data-id');
            document.getElementById('message-modal').style.display = 'none';
            confirmDeleteMessage(messageId);
        });
    }
    
    // 답장 버튼
    const replyMessageBtn = document.getElementById('reply-message-btn');
    if (replyMessageBtn) {
        replyMessageBtn.addEventListener('click', () => {
            const email = document.getElementById('message-email').textContent;
            // 이메일 클라이언트 열기
            window.location.href = `mailto:${email}`;
        });
    }
}

// 메시지 상세 모달 표시 함수
function showMessageModal(messageId) {
    // 임시 데이터 (데모용)
    const demoMessages = {
        '1': { 
            _id: '1', 
            name: '김희망', 
            email: 'hopekim@example.com', 
            subject: '협업 제안', 
            message: '안녕하세요, 귀하의 포트폴리오를 보고 연락드립니다. 저희 팀에서 진행 중인 모바일 게임 프로젝트에 참여해 주실 수 있을지 문의드립니다. 편하실 때 회신 부탁드립니다.',
            read: false, 
            createdAt: '2025-04-14T09:30:00' 
        },
        '2': { 
            _id: '2', 
            name: '이민준', 
            email: 'mjlee@example.com', 
            subject: '취업 문의', 
            message: '안녕하세요, 게임 개발자를 꿈꾸는 컴퓨터공학과 학생입니다. 취업 준비 과정에서 조언을 구하고 싶어 연락드립니다.',
            read: false, 
            createdAt: '2025-04-12T14:45:00' 
        },
        '3': { 
            _id: '3', 
            name: '박서윤', 
            email: 'sypark@example.com', 
            subject: '포트폴리오 피드백', 
            message: '안녕하세요, 귀하의 포트폴리오가 정말 인상적입니다. 특히 VR 프로젝트가 매우 흥미롭게 보였습니다. 제 포트폴리오에 대한 피드백을 주실 수 있을까요?',
            read: false, 
            createdAt: '2025-04-10T11:20:00' 
        },
        '4': { 
            _id: '4', 
            name: '최준호', 
            email: 'jchoi@example.com', 
            subject: '프로젝트 관련 질문', 
            message: '안녕하세요, 귀하의 3D 액션 게임 프로젝트에 관심이 많습니다. 어떤 기술과 도구를 사용하셨는지 여쭤보고 싶습니다.',
            read: true, 
            createdAt: '2025-04-05T10:10:00' 
        },
        '5': { 
            _id: '5', 
            name: '정다은', 
            email: 'dejung@example.com', 
            subject: '게임 제작 컨설팅 문의', 
            message: '안녕하세요, 저희는 교육용 게임을 제작하고자 하는 스타트업입니다. 귀하의 경험과 전문성을 활용한 컨설팅이 가능할지 문의드립니다.',
            read: true, 
            createdAt: '2025-03-28T15:25:00' 
        }
    };
    
    const message = demoMessages[messageId];
    
    if (!message) {
        showNotification('메시지를 찾을 수 없습니다.', 'error');
        return;
    }
    
    // 읽음 표시로 업데이트
    if (!message.read) {
        message.read = true;
        markMessageAsRead(messageId);
    }
    
    // 모달 데이터 표시
    document.getElementById('message-modal-title').textContent = message.subject;
    document.getElementById('message-sender').textContent = message.name;
    document.getElementById('message-email').textContent = message.email;
    document.getElementById('message-date').textContent = new Date(message.createdAt).toLocaleString('ko-KR');
    document.getElementById('message-body').textContent = message.message;
    
    // 모달 표시
    document.getElementById('message-modal').setAttribute('data-id', messageId);
    document.getElementById('message-modal').style.display = 'flex';
}

// 메시지 읽음 표시 함수
function markMessageAsRead(messageId) {
    // 실제 구현에서는 API 호출로 대체
    console.log(`메시지 ID ${messageId} 읽음 표시`);
    
    // 테이블에서 상태 업데이트
    const messageRow = document.querySelector(`#messages-table input[data-id="${messageId}"]`).closest('tr');
    if (messageRow) {
        const statusCell = messageRow.querySelector('td:nth-child(2)');
        if (statusCell) {
            statusCell.innerHTML = '<span class="status-badge status-read">읽음</span>';
        }
    }
    
    // 대시보드 새 메시지 카운트 업데이트
    updateUnreadMessageCount();
}

// 여러 메시지 읽음 표시 함수
function markMessagesAsRead(messageIds) {
    // 실제 구현에서는 API 호출로 대체
    console.log(`메시지 ID ${messageIds.join(', ')} 읽음 표시`);
    
    // 각 메시지 상태 업데이트
    messageIds.forEach(messageId => {
        const messageRow = document.querySelector(`#messages-table input[data-id="${messageId}"]`).closest('tr');
        if (messageRow) {
            const statusCell = messageRow.querySelector('td:nth-child(2)');
            if (statusCell) {
                statusCell.innerHTML = '<span class="status-badge status-read">읽음</span>';
            }
        }
    });
    
    // 체크박스 선택 해제
    const selectAllCheckbox = document.getElementById('select-all-messages');
    if (selectAllCheckbox) {
        selectAllCheckbox.checked = false;
    }
    document.querySelectorAll('#messages-table input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // 대시보드 새 메시지 카운트 업데이트
    updateUnreadMessageCount();
    
    // 성공 메시지 표시
    showNotification('선택한 메시지가 읽음 표시되었습니다.');
}

// 메시지 삭제 확인 창 표시 함수
function confirmDeleteMessage(messageId) {
    const confirmMessage = document.getElementById('confirm-message');
    const confirmActionBtn = document.getElementById('confirm-action-btn');
    const confirmModal = document.getElementById('confirm-modal');
    
    if (!confirmMessage || !confirmActionBtn || !confirmModal) {
        console.error('확인 모달 요소를 찾을 수 없습니다.');
        return;
    }
    
    confirmMessage.textContent = '이 메시지를 영구적으로 삭제하시겠습니까?';
    
    // 이전 이벤트 리스너 제거
    const newConfirmBtn = confirmActionBtn.cloneNode(true);
    confirmActionBtn.parentNode.replaceChild(newConfirmBtn, confirmActionBtn);
    
    // 새 이벤트 리스너 추가
    newConfirmBtn.addEventListener('click', () => {
        deleteMessage(messageId);
        confirmModal.style.display = 'none';
    });
    
    confirmModal.style.display = 'flex';
}

// 메시지 삭제 함수
function deleteMessage(messageId) {
    // 실제 구현에서는 API 호출로 대체
    console.log(`메시지 ID ${messageId} 삭제 요청`);
    
    // 메시지 테이블에서 제거
    const messageRow = document.querySelector(`#messages-table input[data-id="${messageId}"]`).closest('tr');
    if (messageRow) {
        messageRow.remove();
    }
    
    // 대시보드 새 메시지 카운트 업데이트
    updateUnreadMessageCount();
    
    // 성공 메시지 표시
    showNotification('메시지가 성공적으로 삭제되었습니다.');
}

// 안 읽은 메시지 카운트 업데이트 함수
function updateUnreadMessageCount() {
    const unreadMessages = document.querySelectorAll('#messages-table .status-badge.status-unread').length;
    const newMessagesCounter = document.getElementById('new-messages');
    
    if (newMessagesCounter) {
        newMessagesCounter.textContent = unreadMessages;
    }
}
