# Simple Node React Example

This is the repository for a simple chat application using
[react](https://reactjs.org/), [koa](http://koajs.com/) and [sequelize](http://docs.sequelizejs.com/).

[![Build Status](https://travis-ci.org/mrako/node-react-example.svg?branch=master)](https://travis-ci.org/mrako/node-react-example)

## Prerequisites
* [nodejs](http://nodejs.org)
* *([docker](http://docker.com))*

## Node
    cd backend
    npm install
    npm run dev

## Docker
    docker-compose build
    docker-compose up

## Exercises

### The app
* Use [Postman](https://www.getpostman.com/), [curl](https://linux.die.net/man/1/curl) or similiar to
    * Post a new message to */api/chats*
    * Get the messages from */api/chats*
* Add nickname and chat rooms to messages
* Create a new endpoint */api/chats/\<room\>* that returns messages for specific room

### Deploy
* Use SSH keys to login to the server
* Install needed dependencies
* Use Docker to deploy your application to the server
