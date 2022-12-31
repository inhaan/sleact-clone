# Slack 클론 코딩

https://www.inflearn.com/course/%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9-%EC%8B%A4%EC%8B%9C%EA%B0%84%EC%B1%84%ED%8C%85

### 작업중

라우터 주소 설계 (라우트 파라미터)

workspace/:workspace
channel/:channel
dm/:id

워크스페이스에만 접근이 가능할까???

- 가능해야 하지 않을까. 채널을 선택해야 화면이 나오지

채널 생성하기

- 근데 특정 워크스페이스에 접근도 못하는데??... 처음 진입할 때 첫번째 워크스페이스에 진입하도록 해야함
- 또는 이전에 진입했던 워크스페이스를 localStorage에 저장했다가 거기로 접근해줌 firstAccessResolver
- 그 다음 워크스페이스 링크 누르면 이동하기
- 그 다음에 채널 생성하기

워크스페이스에 채널 보여주기?

- 채널 데이터 조회. swr 사용

---

채널 저장하기
