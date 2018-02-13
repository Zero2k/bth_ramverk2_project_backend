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

This repo is part of a school project at Blekinge Institute of Technology and it contains the backend / server for my examination assignment in the course Ramverk2. In short, the task is to create a service / application where we use techniques that we have tested / learned in the course, such as NoSQL databases (MongoDB), WebSocket for Real-Time functionality (I personally chose to use Subscriptions with GraphQL) and optional front-end framework. Learn more about my front-end built with React.js [here](https://github.com/Zero2k/bth_ramverk2_project_frontend). 

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

To run the tests, you can either use Docker or run the tests locally. However if you decide to run the tests locally you will need to have MongoDB up and running, with the Docker Image a MongoDB is automatically started.

#### Locally

```bash
1. yarn start
2. yarn test
```

#### Docker
**This require you to have Docker and docker-compose installed.*
```bash
1. yarn start:docker
2. yarn test
3. yarn stop:docker
```

*The tests is written to test / cover the GraphQL resolvers and make sure that the Queries and Mutations is working as intended.*

#### ESLint

I have used ESLint to format my code based on Airbnb's base JS .eslintrc and Prettier which have formatted the code as soon as it was saved. ESLint has worked great with this project and I seem to have gotten it to work well with the new ES6 syntax. Also, it made sure that my code follow Airbnb's Code Standards / Style Guide.

### CI

The following services are used for Continuous Integration:

[✔] Travis CI  
[✔] Code Climate  
[✔] Better Code Hub  
[✔] Scrutinizer CI  

I use Travis CI and Scrutinizer CI to make sure that my build is working and passing its tests. The other services is used to generate reports of my code quality. Throughout the project, I have managed to keep the code quality at a high level, however as i added coverage via Scrutinizer then my score went down a bit, but it seems to be because of some code in the coverage folder.

### Real-Time


The app utilize subscriptions from Graphql to send messages in real time. Subscptions uses a PubSub implementation and in order to publish the data it uses a WebSocket server and client library to work with GraphQL. So basically you publish to a topic and anyone who subscribe to this topic will recive updates as the data is being published.

To learn more about my implementation of Subscriptions, check out index.js and the SubscriptionServer, basically what it does is it add a WebSocket server with a path /subscriptions where you will connect the client and then it check if all incoming request has an valid JWT token. 

The second part is the Subscription type in my message schema, it describe how the data that is being transmitted should look like and what it should return, in my case it's just message.

The last part is located in the message resolver and consist of two code block. The first part is the Subscription where it filter the messages that's being transmitted with WebSocket and it filter it based on the payload.coin which is the coin field in the message and this allows me to listen for messages that belongs to for example 'bitcoin' on the client. 

The second part is located in the createMessage Mutation and it's where i "emit / publish" the message once it's created.

### Database

The database i use for this project is MongoDB, which is an open-source cross-platform document-oriented database and probably one of the most popular NoSQL databases.

The database store two things, Users and their Messages. These are based of two database models found in src/models and here is how they are structured:

#### User
```bash
{
  username: {
    type: String,
    unique: true,
    minlength: 4,
    maxlength: 17,
  },
  avatar: {
    type: String,
    default: '',
  },
  about: {
    type: String,
    default: '',
  },
  password: String,
  email: {
    type: String,
    unique: true,
  },
}
```

#### Message
```bash
{
  text: {
    type: String,
    minlength: [1, 'Text needs to be longer'],
    maxlength: [500, 'Text cannot exceed 500 characters'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  coin: String,
  likeCount: {
    type: Number,
    default: 0,
  },
}
```

I'm able to create these database models thanks to [Mongoose](http://mongoosejs.com/) which i also use to create the connection to the database and execute operations against the database.

### Modules

I have developed my own module and used it in this project:

[async-coinmarketcap-api ](https://www.npmjs.com/package/async-coinmarketcap-api)

The module is based of the code found in src/services/coinmarketcap.js and it allows me to make API calls to coinmarketcap.com and get data about all cryptocurrencies available on the site.

## Docker

My Docker Image for - [coinChat](https://cloud.docker.com/swarm/zero2k/repository/docker/zero2k/coinchat/general)

## Environment Variables

To set custom environment variables use .env_dev and .env_pro in src/config or change the values directly in src/config/constants.js.

*The app is not dependent on environment variables in order to work as it use some default values, but in production i would highly recommend that you use environment variables to set the JWT Secret*

process.env.PORT | PORT: 8080  
process.env.DB_UR | DB_URL: mongodb://localhost:27017  
process.env.JWT_SECRET_ONE | JWT_SECRET_ONE:  LFoljOEDdS4KDCwjMbiOyqWlgU6vqf1t2a2XJWLdiJeF3MkfnCd86ivXLIutUZwC *(change this in production)*

Access these values by importing the constants file:

```bash
import constants from './src/config/constants';

constants.PORT or constants.DB_URL
```
