const file = require('./files.js')

function getAdminData(sessions) {
    // console.log(getGeralFiles())
    // console.log(getAllFilialFiles())
    console.log(sessions)
}

function getGeralFiles() {
    return file('geral')
}

function getAllFilialFiles() {
    let filiais = ['matriz', 'tb']
    let allFiles = []
    filiais.forEach(element => {
        allFiles.push(file(element))
    })
    return allFiles
}

module.exports = getAdminData
