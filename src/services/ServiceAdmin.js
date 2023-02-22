const ServiceFiles = require('./ServiceFiles.js')

module.exports = class Admin {
    static getAdminData(sessions) {
        const gradeGeral = Admin.getGeralFiles()
        const gradesFiliais = Admin.getAllFilialFiles()
        const data = {
            grades: [[
                {
                    grade: 'Geral',
                    tempoTotal: Admin.getTotalTime(gradeGeral),
                    quantidadeMidias: gradeGeral.length
                }
            ], [
                {
                    grade: 'Matriz',
                    tempoTotal: Admin.getTotalTime(gradesFiliais[0]),
                    quantidadeMidias: gradesFiliais[0].length
                }
            ], [{
                grade: 'Três Barras',
                tempoTotal: Admin.getTotalTime(gradesFiliais[1]),
                quantidadeMidias: gradesFiliais[1].length

            }
            ]

            ],
            sessoes: {
                activeSessions: Admin.getSessionsData(sessions),
            }
        }
        return data
    }

    static getGeralFiles() {
        return ServiceFiles.getFiles('geral')
    }

    static getAllFilialFiles() {
        let filiais = ['matriz', 'tb']
        let allFiles = []
        filiais.forEach(element => {
            allFiles.push(ServiceFiles.getFiles(element))
        })
        return allFiles
    }
    static getTotalTime(grade) {
        let totalTime = 0
        grade.forEach(midia => {
            totalTime += Number(midia.fileDurationTime)
        })
        return (totalTime / 60).toFixed(2)
    }

    static getSessionsData(sessions, filiais) {
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
}