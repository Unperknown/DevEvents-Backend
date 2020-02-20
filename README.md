![author](https://img.shields.io/badge/author-Unperknown-lightgrey.svg)
![HitCount](http://hits.dwyl.io/Unperknown/DevEvents-Backend.svg)
![Bitbucket open issues](https://img.shields.io/github/issues/Unperknown/DevEvents-Backend)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Unperknown/DevEvents-Backend)
![GitHub](https://img.shields.io/github/license/Unperknown/DevEvents-Backend)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Unperknown/DevEvents-Backend)

# DevEvents-Backend

DevEvents는 곧 진행될 개발 관련 행사를 알려주는 웹 사이트입니다. 백엔드 부분은 GraphQL 구조가 사용되었으며 Koa 기반으로 작동합니다.

## 👪 기여자

이 프로젝트를 더 좋은 방향으로 만들고 싶다면 이슈나 PR을 열어주시기 바랍니다!

- [🔗Unperknown](https://github.com/Unperknown)

## 🔑 기술 스택

<img src="https://raw.githubusercontent.com/koajs/koa/HEAD/docs/logo.png" width="200" height="200" />
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1024px-GraphQL_Logo.svg.png" width="200" height="200">
<img src="https://www.nginx.com/wp-content/uploads/2018/08/NGINX-logo-rgb-large.png" width="200" height="80" />
<img src="https://www.docker.com/sites/default/files/d8/2019-07/vertical-logo-monochromatic.png" width="200" height="190">

## 📄 API 문서

[🔗]()

## 📅 개발 일지

### 2/13 - GraphQL CRUD 설정하기

GraphQL와 MongoDB를 연동하였다.

<img src="docs/1.png" width="1000" height="200">

### 2/14 ~ 2/15 - 웹 크롤링 구현

개발 행사 사이트의 데이터를 크롤링하여 저장될 수 있도록 하였다.

Cons
- 크롤링의 전체 플로우에서 메모리 누수가 되지 않도록, 그리고 실행하는 데 러닝타임을 줄일 수 있도록 리팩토링해야 한다.

### 2/16 ~ 2/18 - 웹 크롤링 유지 보수

Cluster를 활용하여 크롤링의 러닝 타임을 줄이고 기존에 여러 브라우저를 실행하는 과정에서 한 브라우저에서 여러 페이지를 렌더링하며 크롤링할 수 있도록 하였다.

Pros
- 크롤링의 러닝 타임을 3배 이상 줄일 수 있었다.
- 하나의 프로세스에서 처리할 수 있도록 하여 메모리 사용을 최대한 줄일 수 있었다.

Cons
- 크롤링 API에 대해서 예외 처리를 추가적으로 구현해야 한다.

<img src="docs/2.png" width="550" height="430">

### 2/19 ~ 2/20 - Apollo Server 적용

Apollo Server를 적용하여 유연한 쿼리 및 뮤테이션이 이루어질 수 있도록 하였다.

<img src="docs/3.png" width="750" height="300">

### 2/21 - 1차 배포