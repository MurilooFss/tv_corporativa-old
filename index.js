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

var dt = new Date()

var memoryStore = new session.MemoryStore()

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: memoryStore,
    cookie: {
        maxAge: 40000,

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
    res.redirect('/tvcorporativa/geral')
})

app.use((req, res, next) => {
    req.session.lastCheck = dt
    next()
})

app.route('/tvcorporativa/geral').get((req, res) => {
    req.session.filial = 'geral'
    res.render('preset')
})
app.route('/tvcorporativa/matriz').get((req, res) => {
    req.session.filial = 'matriz'
    res.render('preset')
})
app.route('/tvcorporativa/tb').get((req, res) => {
    req.session.filial = 'tb'
    res.render('preset',)
})


app.route('/tvcorporativa/admin').get((req, res) => {
    let data = admin(req.sessionStore.sessions)
    res.render('admin', { data })
})


app.route('/filename').get((req, res) => {

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
