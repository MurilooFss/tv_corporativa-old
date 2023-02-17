var express = require('express')
var router = express.Router()

const file = require('./controller/files.js')
const admin = require('./controller/admin.js')
const logger = require('./logger')

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
router.get('/tvcorporativa/admin', (req, res) => {
    let data = admin(req.sessionStore.sessions)
    res.render('admin', { data })
})

router.get('/filename', (req, res) => {
    var dt = new Date()
    try {
        const files = file(req.session.filial)
        res.send({ files })
        logger.info(`Arquivos enviados para ${req.session.filial}, dia ${dt.getDate()}/${(dt.getMonth()) + 1}/${dt.getFullYear()} às ${dt.getHours()}:${dt.getMinutes()}`)
    } catch (e) {
        logger.error(e)
    }

})

module.exports = router;