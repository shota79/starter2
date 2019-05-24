# Front-end Dev Guide

본 프로젝트 Front-end 개발자를 위한 문서 이며 개발 환경 설정에 대한 내용을 담고 있습니다.

### 개발 환경

원활한 작업환경과 가이드 문서 편집을 위해 [Visual Studio Code](https://code.visualstudio.com/) 에디터와 다음 플러그인 설치를 권장 합니다.

**VSCode Extensions**

```shell
- Auto Close Tag
- Beautify
- markdownlint
- Korean Language Pack for Visual Studio Code
- Live Server
- Markdown All in one
- Markdown PDF
```

### 설치 환경

다음 환경에서 정상적인 개발이 가능합니다.

```shell
- node.js : 10.15.3
- gulp-cli : 2.0.1
- gulp : 4.0.2
```

Node.js 설치 전 이면 [Link](https://nodejs.org/ko/) 에서 LTS 버전 다운로드 및 설치 해주세요.

gulp-cli 설치 전 이면 터미널에서 다음 코드를 실행 합니다.

```shell
npm install --global gulp-cli
```

### 설치

설치 환경에 문제가 없다면 터미널에서 다음 코드를 실행 해 설치 합니다.

```shell
npm install
```

### 폴더 구조

설치를 완료하면 다음과 같은 폴더 및 파일 구조를 갖게 됩니다.

> dist 폴더는 `gulp build` 실행 후 자동 생성 됨

```javascript
project
│   README.md
│   package.json        // 개발환경 관련 패키지 설치목록 파일
│   package-lock.json
│   gulpfile.js         // gulp 설정 파일
│
└──ㅡnode_modules       // 설치 후 필요한 패키지 파일 폴더
│
└──ㅡguide              // 프로젝트 가이드 문서 폴더
│   │   tbd.txt
│   │   tbd.txt
│
└───src                 // 개발용 소스 폴더
│   │   index.html      // 프로젝트 파일 인덱스
│   │
│   └───components      // 컴포넌트 파일 폴더
│   └───pages           // 각 HTML 페이지 파일 폴더
│   └───css (or scss)   // css or scss 파일 폴더 (scss 사용유무에 따름)
│   └───js              // js 파일 폴더
│   └───imgs            // images 파일 폴더
│
└───dist                // 산출물 소스 폴더
```

### 실행

터미널에서 다음 명령으로 개발을 시작 합니다.

```shell
gulp            // 웹서버 실행 및 index 오픈
gulp build      // dist 폴더에 배포용 소스를 만듭니다.
gulp clean      // dist 폴더를 비웁니다.
```

___

궁금 한 사항은 [support@ui-lab.co.kr](mailto:support@ui-lab.co.kr) 로 문의 바랍니다. 😀