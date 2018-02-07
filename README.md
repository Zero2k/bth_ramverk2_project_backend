# bth_ramverk2 - Project - react_Express_backend

[![Build Status](https://travis-ci.org/Zero2k/bth_ramverk2_project_backend.svg?branch=master)](https://travis-ci.org/Zero2k/bth_ramverk2_project_backend)
[![BCH compliance](https://bettercodehub.com/edge/badge/Zero2k/bth_ramverk2_project_backend?branch=master)](https://bettercodehub.com/)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Zero2k/bth_ramverk2_project_backend/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Zero2k/bth_ramverk2_project_backend/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/Zero2k/bth_ramverk2_project_backend/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Zero2k/bth_ramverk2_project_backend/build-status/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/96cdc01d55bc6e79a0a9/maintainability)](https://codeclimate.com/github/Zero2k/bth_ramverk2_project_backend/maintainability)
[![Code Coverage](https://scrutinizer-ci.com/g/Zero2k/bth_ramverk2_project_backend/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/Zero2k/bth_ramverk2_project_backend/?branch=master)
[![codecov](https://codecov.io/gh/Zero2k/bth_ramverk2_project_backend/branch/master/graph/badge.svg)](https://codecov.io/gh/Zero2k/bth_ramverk2_project_backend)

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

### Testing

### CI

### Real-Time

### Database

### Modules

## Docker

My Docker Image for - [coinChat](https://cloud.docker.com/swarm/zero2k/repository/docker/zero2k/coinchat/general)
