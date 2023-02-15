let express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')


const logger = require('./logger')
const file = require('./controller/files.js')
const admin = require('./controller/admin.js')

const port = 8080
var path = require('path');
const app = express()

app.use(session({
    secret: 'vmaunhgoqakfd321nmfdsre132',
    rolling: true,
    cookie: {
        expires: 120000,
    }
}))
app.use(cors())
app.use(express.json())



app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))
app.use(bodyParser.urlencoded({ extended: true }))

app.route('/').get((req, res) => {
    res.redirect('/tvcorporativa/default')
})
app.route('/tvcorporativa/default').get((req, res) => {
    res.render('preset')
})
app.route('/tvcorporativa/matriz').get((req, res) => {
    req.session.filial = 'matriz'
    res.render('preset')
})
app.route('/tvcorporativa/tb').get((req, res) => {
    req.session.filial = 'tb'
    res.render('preset')
})


app.route('/tvcorporativa/admin').get((req, res) => {
    admin(req.sessionStore.sessions)
    res.render('admin')
})


app.route('/filename').get((req, res) => {
    let dt = new Date()
    try {
        const files = file(req.session.filial)
        res.send({ files })
        logger.info(`Arquivos enviados para ${req.session.filial}, dia ${dt.getDate()}/${(dt.getMonth()) + 1}/${dt.getFullYear()} às ${dt.getHours()}:${dt.getMinutes()}`)
    } catch (e) {
        logger.error(e)
    }

})


app.listen(port, () => {
    console.log('server iniciado na porta ', port)
})
