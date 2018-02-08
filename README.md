# bth_ramverk2 - Project - react_Express_backend

[![Build Status](https://travis-ci.org/Zero2k/bth_ramverk2_project_backend.svg?branch=master)](https://travis-ci.org/Zero2k/bth_ramverk2_project_backend)
[![BCH compliance](https://bettercodehub.com/edge/badge/Zero2k/bth_ramverk2_project_backend?branch=master)](https://bettercodehub.com/)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Zero2k/bth_ramverk2_project_backend/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Zero2k/bth_ramverk2_project_backend/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/Zero2k/bth_ramverk2_project_backend/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Zero2k/bth_ramverk2_project_backend/build-status/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/96cdc01d55bc6e79a0a9/maintainability)](https://codeclimate.com/github/Zero2k/bth_ramverk2_project_backend/maintainability)
[![Code Coverage](https://scrutinizer-ci.com/g/Zero2k/bth_ramverk2_project_backend/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/Zero2k/bth_ramverk2_project_backend/?branch=master)

## Dependencies

 * [Node.js](https://nodejs.org/en/)
 * [MongoDB](https://www.mongodb.com/)
 * [Graphql](http://graphql.org/)
 * [Apollo GraphQL](https://www.apollographql.com/)
 * [Docker](https://docs.docker.com/engine/installation/) (optional)
 * [Docker-compose](https://docs.docker.com/compose/install/) (optional)

## Follow these steps to start the backend.
```bash
- GETTING STARTED
1. git clone https://github.com/Zero2k/bth_ramverk2_project_backend backend
2. cd backend
3. yarn - install dependencies
## Development
4. yarn start - start the backend
## Production
1. yarn build
2. yarn start:production or yarn serve (start:production requires pm2)
## Docker
1. yarn build
2. docker-compose up
```

# Further documentation

## About

This repo is part of a school project at Blekinge Institute of Technology and it contains the backend / server for my examination assignment in the course Ramverk2. In short, the task is to create a service / application where we use techniques that we have tested in the course, such as NoSQL databases (MongoDB), WebSocket for Real-Time functionality (I personally chose to use Subscriptions with GraphQL) and optional front-end framework. Learn more about my front-end built with React.js [here](https://github.com/Zero2k/bth_ramverk2_project_frontend). 

The application I decided to build is a chat application where you can discuss more than 1000 cryptocurrencies in Real-Time.

## Features

[✔] Subscriptions for real-time chat  
[✔] Authentication with registration and login  
[✔] Chat rooms based on more than 1000 cryptocurrencies  
[✔] Query to get data about single / all cryptocurrencies from coinmarketcap.com  
[✔] Query to get most of the cryptocurrencies logos from cryptocompare.com  
[✔] Mutation / Resolver to update and change user  
[✔] Paginate messages with mongoose skip / limit

## Technologies - Express, MongoDB and GraphQL

The technologies used in this project are the following: Server / Backend is built upon Node.js and Express.js which communicates with MongoDB through GraphQL. The server support GraphQL Queries (In practice, a regular GET request), GraphQL Mutations (POST request) and GraphQL Subscriptions which is based on websocket.

To test out how the server work (without the front-end), i would recommend you to download the project (git clone https://github.com/Zero2k/bth_ramverk2_project_backend backend) and run 'yarn' inside the folder to install all dependencies and then once it's complete, use 'yarn start' to start the server.

Now, since most of the GraphQL queries and mutations is protected and require a user to be logged in, you will need a way to set the authorization header. For this i use [ModHeader (Chrome Extension)](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?utm_source=chrome-app-launcher-info-dialog), but if you prefer any other tool, then feel free to use it. Just make sure you are able to set a header with the name 'x-token'.

Once you have a way to set the headers, go to [localhost:8080/graphiql](localhost:8080/graphiql) in order to access the development tool *GraphiQL*, it should look like the image below.

![Graphiql](screenshots/Graphiql.png)

Now, to make a request to the server, you will first need a JsonWebToken (JWT) which you will get by making a register mutation using *GraphiQL*.

```bash
mutation {
  signup(username: "username", email: "email@email.com", password: "password") {
    success
    token
  }
}
```

Enter the code above on the left side in *GraphiQL* and press the play button and you should get a response that look like this:

```bash
{
  "data": {
    "signup": {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVhN2MzZTBhYzBmZTcyMGUyNWM0NDk3NiIsInVzZXJuYW1lIjoidXNlcm5hbWUifSwiaWF0IjoxNTE4MDkxNzg3LCJleHAiOjE1MTgwOTI5ODd9.UZ7ie4UDxxEUv_s9778JfX9xbqBKW9EoE3tLPdT7U2w"
    }
  }
}
```

Copy the token and set it to your headers using 'x-token' as Name and 'token' as the Value.

*The token is valid for 20 minutes and once it expire all you have to do is either register a new user or login using the following mutation:*

```bash
mutation {
  login(email: "email@email.com", password: "password") {
    success
    token
  }
}
```

Once you have a valid token in your headers, you should be able to execute all the Queries and Mutations found in the Documentation Explorer in *GraphiQL*.

*If you don't understand the documentation or can't set the headers then here's two queries you can use without authentication:*

```bash
# GET DATA ABOUT BITCOIN
{
  coinByName(name: "bitcoin") {
    success
    data {
      id
      name
      price_usd
      percent_change_1h
      last_updated
    }
  }
}
```

```bash
# GET DATA ABOUT TEN OF THE LARGEST CRYPTOCURRENCIES
{
  topTenCoins(limit: 10) {
    success
    data {
      id
      name
      price_usd
      percent_change_1h
      last_updated
    }
  }
}

```

### Testing

### CI

### Real-Time

### Database

### Modules

## Docker

My Docker Image for - [coinChat](https://cloud.docker.com/swarm/zero2k/repository/docker/zero2k/coinchat/general)
