var fs = require('fs');

function getFiles(filial) {
    if (filial == undefined) {
        return 'reload'
    }
    else {
        const arr = []
        fs.readdirSync('./public/arquivos/geral').forEach(file => {
            file = file.toUpperCase()
            if ((file.endsWith('.PNG') || file.endsWith('.JPEG') || file.endsWith('.JPG')) || file.endsWith('.MP4') || file.endsWith('.WEBM')) {

                arr.push(fileInfo(`geral/${file}`))
            }
        })
        if (filial != 'geral') {
            fs.readdirSync(`./public/arquivos/${filial}`).forEach(folder => {
                fs.readdirSync(`./public/arquivos/${filial}/${folder}`).forEach(file => {
                    file = file.toUpperCase()
                    if ((file.endsWith('.PNG') || file.endsWith('.JPEG') || file.endsWith('.JPG')) || file.endsWith('.MP4') || file.endsWith('.WEBM')) {
                        arr.push(fileInfo(`${filial}/${folder}/${file}`))
                    }
                })
            });
        }

        return arr
    }

}

function fileInfo(file) {
    const infoFile = {}
    infoFile.filePath = file

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

module.exports = getFiles;