'use strict';
const { networkInterfaces } = require('os');

const interfaces = networkInterfaces();
const results = [];

const osType = process.platform;

if (osType === 'win32' || osType === 'darwin' || osType === 'linux') {
    for (const name of Object.keys(interfaces)) {
        for (const net of interfaces[name]) {
            const family = net.family === 'IPv4' ? 'IPv4' : 4;
            if (net.family === family && !net.internal && net.cidr !== '127.0.0.1') {
                results.push(net.address);
            }
        }
    }
}

const ans = results.length > 0 ? results[0] : 'localhost';
module.exports = ans;
