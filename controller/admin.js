const file = require('./files.js')

function getAdminData(sessions) {
    const gradeGeral = getGeralFiles()
    const gradesFiliais = getAllFilialFiles()
    const data = {
        grades: [[
            {
                grade: 'Geral',
                tempoTotal: getTotalTime(gradeGeral),
                quantidadeMidias: gradeGeral.length
            }
        ], [
            {
                grade: 'Matriz',
                tempoTotal: getTotalTime(gradesFiliais[0]),
                quantidadeMidias: gradesFiliais[0].length
            }
        ], [{
            grade: 'Três Barras',
            tempoTotal: getTotalTime(gradesFiliais[1]),
            quantidadeMidias: gradesFiliais[1].length

        }

        ]

        ],
        sessoes: {
            activeSessions: getSessionsData(sessions),
        }
    }
    return data
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

function getTotalTime(grade) {
    let totalTime = 0
    grade.forEach(midia => {
        totalTime += Number(midia.fileDurationTime)
    })
    return (totalTime / 60).toFixed(2)
}

function getSessionsData(sessions, filiais) {
    let activeSessions = []
    Object.keys(sessions).forEach((item) => {
        let dt = new Date()
        const sessao = JSON.parse(sessions[item])
        let expires = new Date(sessao.cookie.expires);
        let lastCheck = new Date(sessao.lastCheck)
        if (sessao.filial && expires > dt) {
            let active = {
                id_session: item,
                filial: sessao.filial,
                lastCheck: `${lastCheck.getDate()}/${lastCheck.getMonth() + 1}/${lastCheck.getFullYear()} - ${lastCheck.getHours()}:${lastCheck.getMinutes()}`
            }
            activeSessions.push(active);
        }
    });
    return activeSessions

}


module.exports = getAdminData
