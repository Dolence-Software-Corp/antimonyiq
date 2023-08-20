/*

     ______       ______   __    __  ________  ______  __       __   ______   __    __  __      __  ______   ______  
   _/      \_    /      \ |  \  |  \|        \|      \|  \     /  \ /      \ |  \  |  \|  \    /  \|      \ /      \ 
  /   $$$$$$ \  |  $$$$$$\| $$\ | $$ \$$$$$$$$ \$$$$$$| $$\   /  $$|  $$$$$$\| $$\ | $$ \$$\  /  $$ \$$$$$$|  $$$$$$\
 /  $$$____$$$\ | $$__| $$| $$$\| $$   | $$     | $$  | $$$\ /  $$$| $$  | $$| $$$\| $$  \$$\/  $$   | $$  | $$  | $$
|  $$/     \ $$\| $$    $$| $$$$\ $$   | $$     | $$  | $$$$\  $$$$| $$  | $$| $$$$\ $$   \$$  $$    | $$  | $$  | $$
| $$|  $$$$$| $$| $$$$$$$$| $$\$$ $$   | $$     | $$  | $$\$$ $$ $$| $$  | $$| $$\$$ $$    \$$$$     | $$  | $$ _| $$
| $$| $$| $$| $$| $$  | $$| $$ \$$$$   | $$    _| $$_ | $$ \$$$| $$| $$__/ $$| $$ \$$$$    | $$     _| $$_ | $$/ \ $$
| $$ \$$  $$| $$| $$  | $$| $$  \$$$   | $$   |   $$ \| $$  \$ | $$ \$$    $$| $$  \$$$    | $$    |   $$ \ \$$ $$ $$
 \$$\ \$$$$$$$$  \$$   \$$ \$$   \$$    \$$    \$$$$$$ \$$      \$$  \$$$$$$  \$$   \$$     \$$     \$$$$$$  \$$$$$$\
  \$$\ __/   \                                                                                                   \$$$
   \$$$    $$$                                                                                                       
     \$$$$$$                                                                                                         

*/

require('dotenv').config();
const mongoose = require('mongoose');
const conn = require('./conn');
const app = require('./app');
const ip = require('./ip');
const qrcode = require('qrcode-terminal');

const PORT = 3110;

mongoose.connection.once('open', () => {
    console.log('Facing issues: SCAN ME');
    qrcode.generate('antimonyiq@gmail.com', {small: true}, function (qrcode) {
        console.log(qrcode)
    });

    const serverAddress = `http://${ip}:${PORT}`;
    const endpoints = endpointsData(serverAddress);

    console.log(`Server is running on ${serverAddress}`);
    console.log('Server ENDPOINTS');
    console.log(endpoints);
}); 

app.listen(PORT);

function endpointsData(address) {
    const endpoints = {};

    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            const { path } = middleware.route;
            let endpoint = path;

            endpoints[endpoint] = address + path;
        }
    });

    return endpoints;
}