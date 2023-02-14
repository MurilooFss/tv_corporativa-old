var fs = require('fs');

let express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')


const logger = require('./logger')
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
    res.render('admin')
})


app.route('/filename').get((req, res) => {
    let dt = new Date()
    try {
        const files = getFiles(req.session.filial)
        res.send({ files })
        logger.info(`Arquivos enviados para ${req.session.filial}, dia ${dt.getDate()}/${(dt.getMonth()) + 1}/${dt.getFullYear()} às ${dt.getHours()}:${dt.getMinutes()}`)
    } catch (e) {
        logger.error(e)
    }

})

function getFiles(filial) {
    if (filial != undefined) {
        const arr = []
        fs.readdirSync('./public/arquivos/geral').forEach(file => {
            arr.push(fileInfo(`geral/${file}`))
        });
        fs.readdirSync(`./public/arquivos/${filial}`).forEach(folder => {
            fs.readdirSync(`./public/arquivos/${filial}/${folder}`).forEach(file => {
                arr.push(fileInfo(`${filial}/${folder}/${file}`))
            })
        });
        return arr
    }
    else {
        return 'reload'
    }

}

function fileInfo(file) {
    const infoFile = {}
    infoFile.filePath = file
    file = file.toUpperCase()
    if (file.endsWith('.PNG') || file.endsWith('.JPEG') || file.endsWith('.JPG')) {
        infoFile.fileType = 'image'
    } else if (file.endsWith('.MP4')) {
        infoFile.fileType = 'mp4'
    }
    else if (file.endsWith('.WEBM')) {
        infoFile.fileType = 'webm'
    }
    else {
        infoFile.durationTime = 0
    }
    infoFile.fileDurationTime = file.slice(0, -3).split('').filter(function (ele) {
        return !isNaN(ele);
    }).join('')
    return infoFile
}

function writeLog(filial, expires) {
    let date = new Date()
    const content = `A filial ${filial} recebeu os arquivos às ${date}, irá expirar às ${expires} \n`
    fs.appendFile('./public/arquivos/getlog.log', content, () => { })
}


app.listen(port, () => {
    console.log('server iniciado na porta ', port)
})
