let express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
var path = require('path');

app.use(cors())
app.use(express.json())
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('../files', express.static(path.join(__dirname, 'files')))
app.use('/public', express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, '/views'))
app.use(bodyParser.urlencoded({ extended: true }))


app.use(session({
    secret: 'ilovemilisa',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 3600000,
    }
}))

const route = require('./routes');



app.use('/', route);

module.exports = app;