var fs = require('fs');

let express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')

const port = 8080
var path = require('path');
const app = express()

app.use(session({ secret: 'vmaunhgoqakfd321nmfdsre132' }))
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

app.route('/filename').get((req, res) => {
    const arr = getFiles(req.session.filial)
    const r = { arr }
    res.send(r)
})

function getFiles(filial) {
    const arr = []
    fs.readdirSync('./public/arquivos/geral').forEach(file => {
        arr.push(`geral/${file}`)
    });
    if (filial) {
        fs.readdirSync(`./public/arquivos/${filial}`).forEach(folder => {
            fs.readdirSync(`./public/arquivos/${filial}/${folder}`).forEach(file => {
                arr.push(`${filial}/${folder}/${file}`)
            })
        });
    }
    return arr
}



app.listen(port, () => {
    console.log('server iniciado na porta ', port)
})
