let express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
var path = require('path');
const route = require('./routes');

const port = 8080
const app = express()


app.use(session({
    secret: 'ilovemilisa',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 3600000,
    }
}))

app.use(cors())
app.use(express.json())
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', route);

app.listen(port, () => {
    console.log('server iniciado na porta ', port)
})
