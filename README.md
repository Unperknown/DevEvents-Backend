![author](https://img.shields.io/badge/author-Unperknown-lightgrey.svg)
![HitCount](http://hits.dwyl.io/Unperknown/DevEvents-Backend.svg)
![Bitbucket open issues](https://img.shields.io/github/issues/Unperknown/DevEvents-Backend)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Unperknown/DevEvents-Backend)
![GitHub](https://img.shields.io/github/license/Unperknown/DevEvents)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Unperknown/DevEvents-Backend)

# Backend for DevEvents

This website lets people know what events related to developers are held every month.

## 👪 Contributor(s)

Everyone can open an issue or pull request anytime.

- [🔗Unperknown](https://github.com/Unperknown)

## 🔑 Technology Stacks

<img src="https://raw.githubusercontent.com/koajs/koa/HEAD/docs/logo.png" width="200" height="200" />
<img src="https://www.nginx.com/wp-content/uploads/2018/08/NGINX-logo-rgb-large.png" width="200" height="80" />
<img src="https://www.docker.com/sites/default/files/d8/2019-07/vertical-logo-monochromatic.png" width="200" height="190">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1024px-GraphQL_Logo.svg.png" width="200" height="200">

## API Documentation

[🔗]()

## Daily Progress

### 2/13 - GraphQL CRUD 설정하기

GraphQL와 MongoDB와의 연동하였다.

<img src="docs/1.png" width="1000" height="200">

### 2/14 ~ 2/15 - 웹 크롤링 구현하기

개발 행사 사이트의 데이터를 크롤링하여 저장될 수 있도록 하였다.

Cons
- 크롤링의 전체 플로우에서 메모리 누수가 되지 않도록, 그리고 실행하는 데 러닝타임을 줄일 수 있도록 리팩토링해야 한다.

### 2/16 ~ 2/18 - 웹 크롤링 유지 보수

Cluster를 활용하여 크롤링의 러닝 타임을 줄이고 기존에 여러 브라우저를 실행하는 과정에서 한 브라우저에서 여러 페이지를 렌더링하며 크롤링할 수 있도록 하였다.

<img src="docs/2.png" width="550" height="430">
