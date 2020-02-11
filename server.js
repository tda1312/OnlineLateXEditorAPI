const express = require('express')
const router = require('./api/router')
const path = require('path')

const app = express()

const hostname = '127.0.0.1'
const port = 3000

app.use(express.static(path.join(__dirname, 'templates')))
app.use(express.urlencoded({ extended:true }))
app.use('/', router)

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})