const ServiceFiles = require('../services/ServiceFiles')
const logger = require('../logs/logger')

function getFiles(req, res) {
    var dt = new Date()
    try {
        const files = ServiceFiles.getFiles(req.session.filial, req.session.setor)
        res.send({ files })
        logger.info(`Arquivos enviados para ${req.session.filial}, dia ${dt.getDate()}/${(dt.getMonth()) + 1}/${dt.getFullYear()} às ${dt.getHours()}:${dt.getMinutes()}`)
    } catch (e) {
        logger.error(e)
    }
}


module.exports = getFiles;