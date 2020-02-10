const {
    generateIndex,
    getInputLateX
} = require('./controller')
const router = require('express').Router()

router.get('/', generateIndex)
router.post('/compile', getInputLateX)

module.exports = router