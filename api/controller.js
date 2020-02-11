const {compileLateX} = require('./service')
const path = require('path')

const generateIndex = (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
}

const getInputLateX = (req, res) => {
    compileLateX(req.body.Input, (error) => {
        if (error) {
            console.log(error)
            return
        }
    })
}

const getOutputLateX = (req, res) => {
    downloadLateX(res, (error) => {
        if (error) {
            console.log(error)
            return
        }
    })
}

module.exports = {
    generateIndex,
    getInputLateX,
    getOutputLateX
}