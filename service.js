const Service = require('soa-demo-service');
const config = require('../config.js');

const service = new Service('api');
service.clients();

if (process.argv[2] == '--listen') service.listen();

module.exports = service;
