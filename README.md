# HashQL Starter

A [hashql](https://github.com/hashql/hashql) starter kit.

## Features

- React (hooks and all 🎣)
- Javascript/Typescript (all the latest features 🔥)
- Live-reload client/server (rollup + nodemon 💨)
- Database included ([postgres](https://github.com/porsager/postgres) 💙)

## Getting Started

The following scripts are available:

```
build         - output static build to ./client/dist
client:watch  - compile build and watch for changes
client:start  - serve the static build in ./client/dist
server:start  - start the hashql node server
server:watch  - start server and watch for changes to the ./client or ./server directory
db:start      - start a postgres database (requires docker)
db:stop       - stops the postgres database container
start         - build and serve the client and the server
dev           - build and watch the client and the server
```

The easiest way to get started is to just:

```
$ npm install
$ npm run start:db
$ npm run dev
```

## Configuration

### Server

```
PORT=1337
```

### Database

```
POSTGRES_URL='postgres://hashql:hashql@localhost:5432/hashql?sslmode=disable'
PGHOST=''
PGPORT=''
PGDATABASE=''
PGUSERNAME=''
PGPASSWORD=''
```
