var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name: 'TV-CORPORATIVA',
    description: 'tv corporativa Mili S/A',
    script: 'D:\\tv_corporativa\\index.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
    svc.start();
});

svc.install();
