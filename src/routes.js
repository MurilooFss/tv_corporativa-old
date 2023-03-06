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
    res.redirect('/geral')
})

router.get('/geral', (req, res) => {
    req.session.filial = 'geral'
    res.render('preset')
})
router.get('/matriz/adm', (req, res) => {
    req.session.filial = 'matriz'
    req.session.setor = 'adm'
    res.render('preset')
})
router.get('/matriz/fabr', (req, res) => {
    req.session.filial = 'matriz'
    req.session.setor = 'fabr'
    res.render('preset')
})
router.get('/tb', (req, res) => {
    req.session.filial = 'tb'
    res.render('preset',)
})
router.get('/admin', admin.getAdminData)

router.get('/filename', file)

module.exports = router;