# Slack 클론 코딩

https://www.inflearn.com/course/%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9-%EC%8B%A4%EC%8B%9C%EA%B0%84%EC%B1%84%ED%8C%85

### 작업중

웹소켓

폴링방식... 롱폴링
웹소켓 실시간 양방향 통신 가능

npm i socket.io-client@2

hook으로 공통 로직 작성. 웹소켓 사용

useSocket
싱글턴으로 socket 객체 관리해야 하는거 아닌가???

const socket = io.connect('/ws-workspace ', { transports: ['websocket'] });
웹소켓만 쓰라고 지정함

socket.emit('eventName', 'args');
socket.on('eventName', (data) => {});
socket.disconnect();

emit('login')
워크스페이스에서 이벤트 발생시킨다. 최초에만. 채널 목록을 넣는다 채널 id
워크스페이스 언마운트시 disconnect

DMList
온라인 목록 확인해서 불들어오게 한다
소켓으로 이벤트 받아온다
이벤트 on 하면 정리할 때 off 해야 한다

웹소켓 서버 2.0으로 변경해야 한다 확인
