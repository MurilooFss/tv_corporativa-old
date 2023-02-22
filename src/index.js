const app = require('./app.js')

const port = 8080

app.listen(port, () => {
    console.log('server iniciado na porta ', port)
})
