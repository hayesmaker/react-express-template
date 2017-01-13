# react-express-template
Template for React Client and Node Express backend

Installs Your React and Babel powered `client` files, and serves express
app from another port.
Client uses concurrently to proxy requests to the express app to avoid
CORS errors.

## Prerequisites
- NodeJS

## Installation

```
npm i && cd client && npm i
```

## Run
`(From project root)`
```
npm start

```
- http://localhost:3000 in browser
- Express app will be served at localhost:3001

## Test
- A quick test of the url above in any browser should show a bare React App
- Express app will be on localhost:3001
- open http://localhost:3001/users should respond with a message from Express route:
`routes/users.js`


