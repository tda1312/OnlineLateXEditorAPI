const {
    generateIndex,
    getInputLateX,
    getOutputLateX
} = require('./controller')
const router = require('express').Router()

router.get('/', generateIndex)
router.get('/download', getOutputLateX)
router.post('/compile', getInputLateX)

module.exports = router