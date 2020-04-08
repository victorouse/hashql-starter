const HashQL = require('hashql/server')
const postgres = require('postgres')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const queries = require('./queries.json')

const app = express()
const port = process.env.PORT || 1337
const dev = process.env.NODE_ENV === 'development'
const db = postgres(
  process.env.POSTGRES_URL ||
    'postgres://hashql:hashql@localhost:5432/hashql?sslmode=disable'
)

const buildQuery = (query) =>
  query.slice(1).reduce((acc, arg, i) => acc + '$' + (i + 1) + arg, query[0])

const logQuery = (body) =>
  HashQL(queries, {
    sql: (query) => console.log({ query: buildQuery(query) }),
  })(body)

const hql = HashQL(dev ? (x) => x : queries, {
  sql: (query, ...args) => db.unsafe(buildQuery(query), args),
})

app.use(bodyParser.json())
app.use(cors({ origin: '*', credentials: true }))
app.options('*', cors({ origin: '*', credentials: true }))
app.use(({ body }, _, next) => {
  console.log(body)
  logQuery(body)
  next()
})

app.post('/hql', (req, res) =>
  hql(req.body)
    .then((data) => res.end(JSON.stringify(data)))
    .catch((err) => {
      res.statusCode = 500
      res.end(JSON.stringify({ error: err.message || err.toString() }))
    })
)

app.listen(port, () => console.log('Listening on', port))
