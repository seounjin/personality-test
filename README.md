# personality-test
누구나 자유롭게 만드는 성향 테스트

- 사용스택: TypeScript, Next.js, Jest, NodeJS - Express FrameWork, Spring-Boot
- 개발환경: Window
- 개발도구: Visual Studio Code
- 프로젝트인원: 2명
- 프로젝트기간: 22. 02 ~ 22. 03

<br/>

프로젝트 설명
-----------
각양각색의 사람들의 성향을 테스트 할 수 있는 폼을 제공해주는 웹어플리케이션으로, next.js, typescript, react test를 학습해 보고자 만들어본 토이 프로젝트입니다.

<br/>

담당역할
-----------
- Redux를 사용한 Admin page 상태관리
- 성향 테스트 만들기 CRUD 구현
- Admin Page 테스트 코드 작성
- API 에러핸들링
- Next.js의 getStaticProps, getStaticPaths, getServerSideProps 함수를 사용하여 data fetching
- 웹폰트 최적화

<br/>

코드 개선 및 기능 추가
-----------
[상세설명 링크](https://cobalt-hide-2b2.notion.site/67b8f98235a14e09aab669121800cb73)  
- 명확한 함수 네이밍 작성
- memo, useCallback 을 사용하여 렌더링 최적화
- 긴 함수를 분할하여 가독성 개선
- Redux를 사용하여 props drilling 문제 해결
- 중복되는 코드들은 하나로 묶고 중복되지 않는 코드는 밖으로 빼서 재사용 가능한 컴포넌트로 개선
- 기존의 img 태그에서 next/image 컴포넌트 적용
- 불필요한 마크업 최소화


서버
-----------
[API서버(스프링) 링크](https://github.com/flylofty/personality-test-API-Server)  

[API문서 링크](https://cobalt-hide-2b2.notion.site/a3ad2b9df63e40e98209038ed1e8dac3?v=541aae7ed3d64f8da6b3bee96e89c87d)

<br/>

동작화면
-----------
<br/>


| Create|
|:----------------------------------------:|
|<img src="https://github.com/seounjin/personality-test/blob/main/client/public/_create.gif" width=1000  />|

| Read|
|:----------------------------------------:|
|<img src="https://github.com/seounjin/personality-test/blob/main/client/public/read.gif" width=1000  />|

| Update|
|:----------------------------------------:|
|<img src="https://github.com/seounjin/personality-test/blob/main/client/public/_update.gif" width=1000  />|

| Delete|
|:----------------------------------------:|
|<img src="https://github.com/seounjin/personality-test/blob/main/client/public/delete.gif" width=1000  />|


<br/>

Contributor
-----------
<https://github.com/flylofty>



