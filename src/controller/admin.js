const ServiceAdmin = require('../services/ServiceAdmin')

function getAdminData(req, res) {
    let data = ServiceAdmin.getAdminData(req.sessionStore.sessions)
    res.render('admin', { data })
}
module.exports = { getAdminData }
