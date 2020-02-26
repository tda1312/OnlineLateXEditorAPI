const {
    generateIndex,
    getInputLateX,
    getOutputLateX,
    getPDF
} = require('./controller')
const router = require('express').Router()

router.get('/', generateIndex)
router.get('/download', getOutputLateX)
router.post('/compile', getInputLateX)
router.get('/compile/input.pdf', getPDF)

module.exports = router