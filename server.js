const express = require('express')
const router = require('./api/router')

const app = express()

const hostname = '127.0.0.1'
const port = (process.env.NODE_ENV === 'development') ? 8080: process.env.PORT

app.use('./api', router)

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})