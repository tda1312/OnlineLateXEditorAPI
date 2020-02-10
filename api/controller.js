const {compileLateX} = require('./service')

const generateIndex = (req, res) => {
    res.sendFile('index.html')
}

const getInputLateX = (req, res) => {
}

module.exports = {
    generateIndex,
    getInputLateX
}