const chatContainer = document.getElementById('chatContainer');
const chatTitle = document.getElementById('chatTitle');

// 드래그 관련 변수 설정
let isDragging = false;
let offsetX, offsetY;

// 크기 조절 관련 변수 설정
let isResizing = false;
let startWidth, startHeight, startX, startY;

// 채팅창 드래그 시작
chatTitle.addEventListener('mousedown', (event) => {
    if (isInResizeZone(event)) {
        startResizing(event);
    } else {
        startDragging(event);
    }
});

function startDragging(event) {
    isDragging = true;
    offsetX = event.clientX - chatContainer.getBoundingClientRect().left;
    offsetY = event.clientY - chatContainer.getBoundingClientRect().top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function startResizing(event) {
    isResizing = true;
    startWidth = chatContainer.offsetWidth;
    startHeight = chatContainer.offsetHeight;
    startX = event.clientX;
    startY = event.clientY;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    event.stopPropagation();
}

// 마우스 이동 시 위치 업데이트
function onMouseMove(event) {
    if (isDragging) {
        chatContainer.style.left = event.pageX - offsetX + 'px';
        chatContainer.style.top = event.pageY - offsetY + 'px';
    } else if (isResizing) {
        const newWidth = startWidth + (event.clientX - startX);
        const newHeight = startHeight + (event.clientY - startY);

        // 최소 크기 제한
        chatContainer.style.width = Math.max(newWidth, 150) + 'px';
        chatContainer.style.height = Math.max(newHeight, 200) + 'px';
    }
}

// 드래그 및 크기 조절 중지
function onMouseUp() {
    isDragging = false;
    isResizing = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    repositionWithinBounds();
}

// 크기 조절 영역 확인 (오른쪽 하단 모서리 20px 내)
function isInResizeZone(event) {
    const rect = chatContainer.getBoundingClientRect();
    return (
        event.clientX > rect.right - 20 &&
        event.clientY > rect.bottom - 20
    );
}

// 화면 경계 내로 위치 조정
function repositionWithinBounds() {
    const containerRect = chatContainer.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();

    if (containerRect.left < bodyRect.left) {
        chatContainer.style.left = '0px';
    } else if (containerRect.right > bodyRect.right) {
        chatContainer.style.left = `${bodyRect.width - containerRect.width}px`;
    }

    if (containerRect.top < bodyRect.top) {
        chatContainer.style.top = '0px';
    } else if (containerRect.bottom > bodyRect.bottom) {
        chatContainer.style.top = `${bodyRect.height - containerRect.height}px`;
    }
}

// 채팅 메시지 표시
function receiveChat(nickname, message) {
    const chatMessage = document.createElement('div');
    
    // 공백을 유지하기 위해 white-space 스타일 적용 (방법 1)
    chatMessage.style.whiteSpace = 'pre-wrap';

    // &nbsp;가 적용된 상태로 innerHTML을 설정 (방법 2)
    chatMessage.innerHTML = `${nickname}: ${message}`;
    
    chatContainer.insertBefore(chatMessage, inputArea);

    // 스크롤을 아래로 이동
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// 입력 영역 생성
const inputArea = document.createElement('div');
inputArea.className = 'input-area';

const chatInput = document.createElement('input');
chatInput.type = 'text';
chatInput.placeholder = '메시지를 입력하세요...';

const sendButton = document.createElement('button');
sendButton.textContent = '전송';

inputArea.appendChild(chatInput);
inputArea.appendChild(sendButton);
chatContainer.appendChild(inputArea);

// 메시지 전송 함수
function sendMessage() {
    let message = chatInput.value;
    if (message.length > 0) { // 빈 문자열이 아닐 때만 전송
        // 모든 공백을 &nbsp;로 변환
        message = message.replace(/ /g, '\u00a0'); // 방법 2 적용
        sendChatMessage(message);
        chatInput.value = ''; // 입력 필드 초기화
    }
}

// 전송 버튼 클릭 이벤트
sendButton.addEventListener('click', sendMessage);

// Enter 키로 메시지 전송 및 스페이스바 입력 허용
chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
    // 스페이스바 입력 허용
    else if (event.key === ' ') {
        chatInput.value += ' ';
        event.preventDefault(); // 기본 동작을 방지하고 스페이스 추가
    }
});

// 채팅방 제목 변경 함수
function setChatRoomTitle(title) {
    document.getElementById('chatTitle').textContent = title;
}

function clearChatMessages() {
    // chatTitle과 inputArea를 제외하고 모든 자식 요소 제거
    const messages = Array.from(chatContainer.children).filter(child => 
        child !== chatTitle && child !== inputArea
    );
    messages.forEach(message => chatContainer.removeChild(message));
}

// 채팅 기능 테스트
socket.on('chat-receive', function (data) {
    if (currentMap == data.map) {
        receiveChat(String(data.nickName), String(data.message));
    }
});

function sendChatMessage(message) {
    socket.emit('chat-send', {nickName: playerId, message: message, map: currentMap});
}
