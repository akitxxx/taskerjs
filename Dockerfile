FROM node:12

# アプリケーションディレクトリ作成
WORKDIR /usr/src/app/tasker

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]