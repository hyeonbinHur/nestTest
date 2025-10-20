# Node.js 20 기반 이미지 사용
FROM node:20

# 작업 디렉토리 생성 및 이동
WORKDIR /app

# dist 폴더와 package.json, package-lock.json 복사
COPY ./dist ./dist
COPY ./package*.json ./

# 프로덕션 의존성 설치
RUN npm install --only=production

# 3000번 포트 오픈
EXPOSE 3000

# 서버 실행 명령
CMD ["node", "dist/main.js"]
