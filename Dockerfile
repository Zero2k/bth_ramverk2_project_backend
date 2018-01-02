FROM node:alpine

RUN mkdir -p /app
WORKDIR /app

COPY package-lock.json .
COPY package.json .

RUN npm install

COPY dist .

CMD ["node", "index.js"]
