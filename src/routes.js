var express = require('express')
var router = express.Router()

const file = require('./controller/files.js')
const admin = require('./controller/admin.js')


router.use('/', (req, res, next) => {
    var dt = new Date()
    req.session.lastCheck = dt
    next()
})

router.get('/', (req, res) => {
    res.redirect('/tvcorporativa/geral')
})

router.get('/tvcorporativa/geral', (req, res) => {
    req.session.filial = 'geral'
    res.render('preset')
})
router.get('/tvcorporativa/matriz', (req, res) => {
    req.session.filial = 'matriz'
    res.render('preset')
})
router.get('/tvcorporativa/tb', (req, res) => {
    req.session.filial = 'tb'
    res.render('preset',)
})
router.get('/tvcorporativa/admin', admin.getAdminData)

router.get('/filename', file)

module.exports = router;