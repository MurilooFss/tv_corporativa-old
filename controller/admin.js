const file = require('./files.js')

function getAdminData(sessions) {
    const gradeGeral = getGeralFiles()
    const gradesFiliais = getAllFilialFiles()
    const filiais = ['matriz', 'tb', 'cedi', 'maceio']
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
            activeSessions: getSessionsData(sessions, filiais)
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
        filiais.forEach((filial) => {
            var result = sessions[item].includes(filial)
            if (result) {
                activeSessions.push([filial, item])
            }
        })
    });
    return activeSessions

}


module.exports = getAdminData
