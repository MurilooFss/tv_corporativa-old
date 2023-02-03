var fs = require('fs');
let express = require('express')
const cors = require('cors')

const port = 5500
var path = require('path');
const app = express()
app.use(express.json())
app.use(cors())



app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))


app.route('/').get((req, res) => {
    res.redirect('/tvcorporativa/tb')
})
app.route('/tvcorporativa/tb').get((req, res) => {

    fs.readdir('./arquivos', function (error, fl) {
        res.render('preset')



    })
})
app.route('/filename').get((req, res) => {
    fs.readdir('./public/arquivos', function (error, fl) {

        const reqFile = req.query.thisFile
        const file = fl[reqFile]
        const lengthDir = fl.length
        const r = { file, lengthDir }
        res.send(r)
    })
})



app.listen(port, () => {
    console.log('server iniciado na porta ', port)
})
