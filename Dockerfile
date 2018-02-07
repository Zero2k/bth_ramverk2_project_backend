FROM node:alpine

RUN mkdir -p /app
WORKDIR /app

COPY yarn.lock .
COPY package.json .

RUN yarn

COPY dist .

CMD ["node", "index.js"]
