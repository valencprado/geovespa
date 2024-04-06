FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install --verbose better-sqlite3

COPY . .

ENV PORT=1337

EXPOSE 1337

CMD [ "npm", "run", "dev" ]