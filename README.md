# OliveYoung Global Organization Repositories

NestJS 백엔드와 React 프론트엔드를 하나로 통합한 풀스택 애플리케이션

## 프로젝트 구조

```
nestTest/
├── client/          # React + Vite 프론트엔드
│   ├── src/
│   │   ├── pages/           # 페이지 컴포넌트
│   │   ├── components/      # 재사용 컴포넌트
│   │   ├── styles/          # SCSS 스타일
│   │   └── config/          # 설정 파일
│   └── dist/               # 빌드 결과물
├── server/          # NestJS 백엔드
│   ├── src/
│   │   ├── repositories/    # 리포지토리 모듈
│   │   └── data/           # JSON 데이터
│   └── dist/               # 빌드 결과물
└── package.json     # 루트 패키지 (통합 스크립트)
```

## 설치 방법

### 1. 모든 의존성 설치
```bash
npm run install:all
```

## 개발 모드

### 방법 1: 개발 서버 따로 실행 (권장)

**터미널 1 - 백엔드:**
```bash
cd server
npm run start:dev
```
- 백엔드: http://localhost:3000
- API: http://localhost:3000/api

**터미널 2 - 프론트엔드:**
```bash
cd client
npm run dev
```
- 프론트엔드: http://localhost:5173 또는 http://localhost:5174

### 방법 2: 동시 실행
```bash
npm run dev
```
- 백엔드와 프론트엔드를 동시에 실행

## 프로덕션 빌드 및 배포

### 1. 빌드
```bash
npm run build
```
이 명령어는:
1. `client/dist/` 에 React 앱을 빌드
2. `server/dist/` 에 NestJS 앱을 빌드

### 2. 프로덕션 실행
```bash
npm start
```
또는
```bash
cd server
npm run start:prod
```

- 통합 앱: http://localhost:3000
- API: http://localhost:3000/api
- React 앱: http://localhost:3000 (NestJS가 정적 파일로 서빙)

## URL 구조

### 프론트엔드 라우트
- `/` - 로그인 페이지
- `/repositories` - 리포지토리 목록
- `/repository/:id` - 리포지토리 상세 정보
- `/repository/edit/:id` - 리포지토리 설정 수정

### API 엔드포인트
- `GET /api/repositories` - 리포지토리 목록 조회
- `PATCH /api/repositories/:id` - 리포지토리 설정 수정

## 환경 변수

### 개발 모드 (.env)
```
VITE_API_URL=http://localhost:3000/api
```

### 프로덕션 모드 (.env.production)
```
VITE_API_URL=/api
```

## 배포 가이드

### 단일 서버 배포
프로덕션에서는 하나의 NestJS 서버만 실행하면 됩니다:

1. 빌드 실행
```bash
npm run build
```

2. `server/dist/` 폴더를 서버에 업로드

3. 서버에서 실행
```bash
cd server
npm run start:prod
```

4. NestJS가 자동으로:
   - API 요청(`/api/*`)은 백엔드로 처리
   - 나머지 요청은 React 정적 파일로 서빙

### Docker 배포 (선택사항)
Docker를 사용하려면 Dockerfile 생성:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# 빌드된 파일 복사
COPY server/dist ./server/dist
COPY server/package*.json ./server/
COPY client/dist ./client/dist

# 프로덕션 의존성만 설치
WORKDIR /app/server
RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

## 기술 스택

### 프론트엔드
- React 18
- TypeScript
- React Router DOM
- Vite
- SASS

### 백엔드
- NestJS
- TypeScript
- Express

## 주요 기능

1. **GitHub OAuth 스타일 로그인**
2. **리포지토리 관리**
   - 목록 조회
   - 상세 정보 보기
   - 설정 수정
3. **Configuration 관리**
   - API Keys (Gemini, Claude)
   - GitHub Token
   - Review 설정
   - Auto Trigger

## 라이센스

ISC
